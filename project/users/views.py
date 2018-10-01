from django.db import IntegrityError
from django.http import *
from django.contrib.auth import authenticate, login
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt

from .validators import PasswordValidator
from .decorators import require_login
from .forms import ProfileForm, UserCreationForm, UserUpdateForm
from .models import *


# Create your views here.

def index(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            return update(request)
        else:
            try:
                user_form = UserCreationForm(request.POST)
                if user_form.is_valid():
                    user = user_form.save(commit=False)
                    institution = Institution.objects.filter(id=int(request.POST["institution"])).first()
                    if institution is not None:
                        profile_form = ProfileForm(request.POST, request.FILES)
                        if profile_form.is_valid():
                            interests = request.POST["interests"].split()
                            if len(interests) >= 6:
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
                return HttpResponseBadRequest("Request badly formatted")
            return HttpResponseBadRequest("Request badly formatted")
    else:
        return HttpResponseNotAllowed("Method not Allowed")


@require_login
def get_user_info(request, params):
    user = User.objects.filter(id=params["user_id"]).first()
    if user is not None:
        return JsonResponse(user.profile.to_json())
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


def update(request):
    user_form = UserUpdateForm(request.POST, instance=request.user)
    profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
    institution = Institution.objects.filter(id=int(request.POST["institution"])).first()
    if user_form.is_valid() and profile_form.is_valid() and institution is not None:
        user_form.save()
        profile = profile_form.save(commit=False)
        profile.institution = institution
        profile.save()


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
    try:
        profile = Profile.objects.filter(email_guid=request.GET["guid"]).first()
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
