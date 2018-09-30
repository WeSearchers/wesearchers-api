from django.db import IntegrityError
from django.http import *
from django.contrib.auth import authenticate, login

from .decorators import require_login
from .forms import ProfileForm, UserCreationForm
from .models import *
from django.core.mail import send_mail


# Create your views here.

def index(request):
    if request.method == "POST":
        user_form = UserCreationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save(commit=False)
            institution = Institution.objects.get(id=int(request.POST["institution"]))
            if institution is not None:
                profile_form = ProfileForm(request.POST, request.FILES)
                if profile_form.is_valid():
                    interests = request.POST["interests"].split(",")
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
                        # send_mail("WeSearchers account activation", "<running url>", "activate@wesearchers.pt", [user.email])
                return HttpResponse("Request badly formatted")

        return HttpResponseBadRequest()
    elif request.method == "GET":
        try:
            user = authenticate(request, username=request.GET["name"], password=request.GET["password"])
        except KeyError:
            return HttpResponseBadRequest("Request badly formatted")
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return HttpResponseBadRequest("User Doesn't Exist")
    else:
        return HttpResponseNotAllowed("Method not Allowed")


@require_login
def update(request):
    pass

def validate(request):
    try:
        profile = Profile.objects.get(email_guid=request.GET["guid"])
    except KeyError:
        return HttpResponseBadRequest("Request badly formatted")
    if profile is not None and profile.user.is_active is False:
        user = profile.user
        user.is_active = True
        user.save()
        return HttpResponse()
    else:
        return HttpResponseNotFound()
