import hashlib
import random
from django.contrib.auth.models import User
from django.db import models


class Institution(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="institution/logo/")


class Profile(models.Model):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.email_guid = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="profile")
    orcid_id = models.CharField(max_length=16)
    institution = models.ForeignKey(Institution, models.CASCADE)
    bio = models.CharField(max_length=240)
    image = models.ImageField(upload_to="profile/avatar/")
    email_guid = models.CharField(max_length=40)


class UserInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interest = models.CharField(max_length=50)
