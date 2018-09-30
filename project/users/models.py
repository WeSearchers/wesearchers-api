import hashlib
import random
from django.contrib.auth.models import User
from django.db import models

from project.guid import new_guid


class Institution(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="institution/logo/")


class Profile(models.Model):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.email_guid = new_guid()

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="profile")
    orcid = models.CharField(max_length=16)
    institution = models.ForeignKey(Institution, models.CASCADE)
    bio = models.CharField(max_length=240)
    image = models.ImageField(upload_to="profile/avatar/")
    email_guid = models.CharField(max_length=40)


class UserInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interest = models.CharField(max_length=50)
