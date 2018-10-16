from django.db import IntegrityError
from django.http import *
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt

from .validators import PasswordValidator
from .decorators import require_login
from .forms import ProfileForm, UserCreationForm, UserUpdateForm
from .models import *
import sys


# Create your views here.
def register(request):
    if request.method == "POST":
        try:
            user_form = UserCreationForm(request.POST)
            if user_form.is_valid():
                user = user_form.save(commit=False)
                profile_form = ProfileForm(request.POST, request.FILES)
                if profile_form.is_valid():
                    interests = request.POST["interests"].split()
                    if len(interests) >= 6:
                        institution = Institution.objects.filter(name=request.POST["institution"]).first()
                        if institution is None:
                            institution = Institution(name=request.POST["institution"])
                            institution.save()
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
        except KeyError:
            return JsonResponse(list(map(lambda error: error.__str__(),list(user_form.errors.values()))),status=400, safe=False)
        print(user_form.errors.values(), file=sys.stderr)
        return JsonResponse(list(map(lambda error: error.__str__(),list(user_form.errors.values()))),status=400, safe=False)
    else:
        return HttpResponseNotAllowed("Method not Allowed")


@require_login
def get_user_info(request, user_id):
    if user_id == 0:
        user = request.user
    else:
        user = User.objects.filter(id=user_id).first()
    if user is not None:
        return JsonResponse(user.profile.to_json(), safe=False)
    else:
        return HttpResponseNotFound()


def login_session(request):
    if request.method == "POST":
        try:
            user = authenticate(username=request.POST["username"], password=request.POST["password"])
        except KeyError:
            return HttpResponseBadRequest("Request badly formatted")
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed("Method not Allowed")


@require_login
def update(request):
    user_form = UserUpdateForm(request.POST, instance=request.user)
    profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
    institution = Institution.objects.filter(id=int(request.POST["institution"])).first()
    interests = request.POST["interests"].split()
    if user_form.is_valid() and profile_form.is_valid() and institution is not None and len(interests) >= 6:
        for interest in request.user.interests:
            interest.delete()
        for interest in interests:
            user_interest = UserInterest(interest=interest)
            user_interest.user = request.user
            user_interest.save()
        user_form.save()
        profile = profile_form.save(commit=False)
        profile.institution = institution
        profile.save()
        return HttpResponse()
    return HttpResponseBadRequest()


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
    profile = Profile.objects.filter(email_guid=request.POST["guid"]).first()
    if profile is not None and request.POST["new_password1"] == request.POST["new_password2"] \
            and PasswordValidator().validate(request.POST["new_password1"]):
        profile.user.set_password(request.POST["new_password1"])
        profile.user.save()
        profile.email_guid = new_guid()
        profile.save()
        return HttpResponse()
    else:
        return HttpResponseBadRequest()


@require_login
def change_password(request):
    user = authenticate(request, username=request.user.username, password=request.POST["old_password"])
    if user is not None and request.POST["new_password1"] != request.POST["old_password"] \
            and request.POST["new_password1"] == request.POST["new_password2"] \
            and PasswordValidator().validate(request.POST["new_password1"]):
        user.set_password(request.POST["new_password1"])
        user.save()
        user.profile.email_guid = new_guid()
        user.profile.save()
        return HttpResponse()
    else:
        return HttpResponseBadRequest()


def validate(request):
    if request.method == "POST":
        try:
            profile = Profile.objects.filter(email_guid=request.POST["guid"]).first()
        except KeyError:
            return HttpResponseBadRequest("Request badly formatted")
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
                map(lambda user: user.user.profile.to_json(), UserFollow.objects.filter(followed=request.user)))
        else:
            followers = list(map(lambda user: user.user.profile.to_json(),
                                 UserFollow.objects.filter(followed_id=int(request.GET["user_id"]))))
        return JsonResponse(followers, safe=False)
    else:
        return HttpResponseNotAllowed()


@require_login
def get_following(request):
    if request.method == "GET":
        if "user_id" not in request.GET.keys():
            following = list(
                map(lambda user: user.followed.profile.to_json(), UserFollow.objects.filter(user=request.user)))
        else:
            following = list(map(lambda user: user.followed.profile.to_json(),
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
        except KeyError:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed()


@require_login
def is_logged_in(request):
    return HttpResponse()


@require_login
def logout_view(request):
    logout(request)
    return HttpResponse()
