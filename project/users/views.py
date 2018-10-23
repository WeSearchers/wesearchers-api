from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.forms import ModelForm
from django.forms.utils import ErrorDict
from django.http import *
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt

from .responses import HttpResponseUnauthorized
from .validators import PasswordValidator
from .decorators import require_login
from .forms import ProfileForm, UserCreationForm, UserUpdateForm, ProfileUpdateForm, ResourceForm
from .models import *
import sys


def error_dict(*args):
    final = dict()
    for item in args:
        if item is not None:
            if issubclass(type(item), ModelForm):
                errors = dict()
                for error in item.errors.keys():
                    errors[error] = item.errors[error][0]
                final = {**final, **errors}
            else:
                final = {**final, **item}
    return final


# Create your views here.
def register(request):
    if request.method == "POST":
        errors = {}
        user_form = UserCreationForm(request.POST)
        profile_form = ProfileForm(request.POST, request.FILES)
        if user_form.is_valid() and profile_form.is_valid():

            interests = request.POST["interests"].split()
            if len(interests) >= 6:
                try:
                    institution = Institution.objects.filter(name=request.POST["institution"]).first()
                except KeyError as k:
                    return JsonResponse(
                        error_dict(user_form, profile_form, errors, {k.args[0]: "field missing in form"}), status=400)
                if institution is None:
                    institution = Institution(name=request.POST["institution"])
                    institution.save()
                user = user_form.save(commit=False)
                user.is_active = False
                user.save()
                for interest in interests:
                    user_interest = UserInterest(interest=interest)
                    user_interest.user = user
                    user_interest.save()
                profile = profile_form.save(commit=False)
                profile.user = user
                profile.institution = institution
                profile.save()
                send_mail("WeSearchers account activation",
                          settings.RUNNING_HOST + "/activate?guid=" + profile.email_guid,
                          "activate@wesearchers.pt", [user.email])
                return JsonResponse(user.id, safe=False)
            else:
                errors["interests"] = "must select 6 interests or more"
        return JsonResponse(error_dict(user_form, profile_form, errors), status=400)
    else:
        return HttpResponseNotAllowed("Method not Allowed")


@require_login
def get_user_info(request, user_id):
    if user_id == 0:
        user = request.user
    else:
        user = User.objects.filter(id=user_id).first()
    if user is not None:
        return JsonResponse(user.profile.serialize(), safe=False)
    else:
        return HttpResponseNotFound()


def login_session(request):
    if request.method == "POST":
        try:
            user = authenticate(username=request.POST["username"], password=request.POST["password"])
        except KeyError as k:
            return JsonResponse({k.args[0]: "field missing in form"}, status=400)
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed("Method not Allowed")


@require_login
def update(request):
    errors = {}
    user_form = UserUpdateForm(request.POST, instance=request.user)
    profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
    try:
        institution = Institution.objects.filter(id=int(request.POST["institution"])).first()
        interests = request.POST["interests"].split()
    except KeyError as k:
        return JsonResponse(
            error_dict(user_form, profile_form, errors, {k.args[0]: "field missing in form"}), status=400)
    if user_form.is_valid() and profile_form.is_valid():
        if len(interests) >= 6:
            for interest in list(UserInterest.objects.filter(user=request.user)):
                interest.delete()
            for interest in interests:
                user_interest = UserInterest(interest=interest)
                user_interest.user = request.user
                user_interest.save()
            user_form.save()
            profile = profile_form.save(commit=False)
            if institution is None:
                institution = Institution(name=request.POST["institution"])
                institution.save()
            profile.institution = institution
            profile.save()
            return HttpResponse()
        else:
            errors["interests"] = "must select 6 interests or more"
    return JsonResponse(error_dict(user_form, profile_form, errors), status=400)


def guid_check(request):
    return JsonResponse(Profile.objects.filter(email_guid=request.GET["guid"]).first() is not None, safe=False)


def send_reset_password_email(request):
    user = User.objects.filter(email=request.POST["email"]).first()
    if user is not None:
        send_mail("WeSearchers Password Reset",
                  settings.RUNNING_HOST + "/resetpw?guid=" + user.profile.email_guid,
                  "reset_password@wesearchers.pt", [user.email])
        return HttpResponse()
    else:
        return HttpResponseNotFound()


def reset_password(request):
    try:
        profile = Profile.objects.filter(email_guid=request.POST["guid"]).first()
        if profile is not None:
            if request.POST["new_password1"] == request.POST["new_password2"]:
                pv = PasswordValidator()
                try:
                    pv.validate(request.POST["new_password1"])
                except ValidationError as v:
                    return JsonResponse({"new_password1": v.message}, status=400)
                profile.user.set_password(request.POST["new_password1"])
                profile.user.save()
                profile.email_guid = new_guid()
                profile.save()
                return HttpResponse()
            else:
                return JsonResponse({"new_password2": "passwords don't match"}, status=400)
        else:
            return JsonResponse({"user": "user not found"}, status=404)
    except KeyError as k:
        return JsonResponse({k.args[0]: "field missing in form"}, status=400)


@require_login
def change_password(request):
    try:
        user = authenticate(request, username=request.user.username, password=request.POST["old_password"])
        if user is not None:
            if request.POST["new_password1"] != request.POST["old_password"]:
                if request.POST["new_password1"] == request.POST["new_password2"]:
                    pv = PasswordValidator()
                    try:
                        pv.validate(request.POST["new_password1"])
                    except ValidationError as v:
                        return JsonResponse({"new_password1": v.message}, status=400)
                    user.set_password(request.POST["new_password1"])
                    user.save()
                    return HttpResponse()
                else:
                    return JsonResponse({"new_password2": "passwords dont match"}, status=400)
            else:
                return JsonResponse({"new_password1": "new password same as old password"}, status=400)
        else:
            return JsonResponse({"old_password": "old password is incorrect"}, status=400)
    except KeyError as k:
        return JsonResponse({k.args[0]: "field missing in form"}, status=400)


def validate(request):
    if request.method == "POST":
        try:
            profile = Profile.objects.filter(email_guid=request.POST["guid"]).first()
        except KeyError as k:
            return JsonResponse({k.args[0]: "field missing in form"}, status=400)
        if profile is not None and profile.user.is_active is False:
            user = profile.user
            user.is_active = True
            user.save()
            profile.email_guid = new_guid()
            profile.save()
            return HttpResponse()
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed()


@require_login
def get_followers(request):
    if request.method == "GET":
        if "user_id" not in request.GET.keys():
            followers = list(
                map(lambda user: user.user.profile.serialize(), UserFollow.objects.filter(followed=request.user)))
        else:
            followers = list(map(lambda user: user.user.profile.serialize(),
                                 UserFollow.objects.filter(followed_id=int(request.GET["user_id"]))))
        return JsonResponse(followers, safe=False)
    else:
        return HttpResponseNotAllowed()


@require_login
def get_following(request):
    if request.method == "GET":
        if "user_id" not in request.GET.keys():
            following = list(
                map(lambda user: user.followed.profile.serialize(), UserFollow.objects.filter(user=request.user)))
        else:
            following = list(map(lambda user: user.followed.profile.serialize(),
                                 UserFollow.objects.filter(user_id=int(request.GET["user_id"]))))
        return JsonResponse(following, safe=False)
    else:
        return HttpResponseNotAllowed()


"""
@require_login
def get_collaborators(request):
    #insert code here
    return HttpResponse()
"""


@require_login
def delete_resource(request):
    if request.method == "POST":
        try:
            resource = Resource.objects.filter(id=request.POST["resource_id"]).first()
            if resource is not None:
                if resource.user == request.user:
                    resource.delete()
                    return HttpResponse()
                else:
                    return HttpResponseUnauthorized()
            else:
                return HttpResponseNotFound()
        except KeyError as k:
            return JsonResponse({k.args[0]: "field missing in form"}, status=400)
    else:
        return HttpResponseNotAllowed()


@require_login
def add_resource(request):
    resource_form = ResourceForm(request.POST)
    try:
        if resource_form.is_valid():
            resource = resource_form.save(commit=False)
            resource.user = request.user
            resource.save()
            tags = request.POST["tags"].split()
            for tag in tags:
                resource_interest = ResourceInterest(interest=tag)
                resource_interest.resource = resource
                resource_interest.save()
            return JsonResponse(resource.id, safe=False)
        else:
            return JsonResponse(error_dict(resource_form), status=400)
    except KeyError as k:
        return JsonResponse(error_dict(resource_form, {k.args[0]: "field missing in form"}), status=400)


def get_resources(request):
    resources = list(Resource.objects.all())
    resources.sort(key=lambda x: x.date, reverse=True)
    final_list = list((map(lambda x: x.serialize(), resources)))
    return JsonResponse(final_list, safe=False)


@require_login
def resource_view(request):
    if request.method == "GET":
        return get_resources(request)
    elif request.method == "POST":
        return add_resource(request)
    else:
        return HttpResponseNotAllowed()


@require_login
def resource_tags(request):
    tags = list(set(map(lambda res: res.interest, filter(lambda ri: ri.resource.user == request.user, ResourceInterest.objects.all()))))
    return JsonResponse(tags, safe=False)


@require_login
def resources_by_interest(request):
    tags = request.GET["tags"].split(",")
    resources = list()
    for tag in tags:
        resources += list(map(lambda r: r.resource, ResourceInterest.objects.filter(interest=tag)))
    resources = list({v.id: v for v in resources}.values())
    resources.sort(key=lambda x: x.date, reverse=True)
    final_list = list(map(lambda x: x.serialize(), resources))
    return JsonResponse(final_list, safe=False)


@require_login
def follow_view(request):
    if request.method == "POST":
        try:
            followed = User.objects.filter(id=request.POST["user_id"]).first()
            if followed is not None:
                follow = UserFollow(user=request.user, followed=followed)
                follow.save()
                return HttpResponse()
            else:
                return HttpResponseNotFound()
        except KeyError as k:
            return JsonResponse({k.args[0]: "field missing in form"}, status=400)
    else:
        return HttpResponseNotAllowed()


@require_login
def is_logged_in(request):
    return HttpResponse()


@require_login
def logout_view(request):
    logout(request)
    return HttpResponse()
