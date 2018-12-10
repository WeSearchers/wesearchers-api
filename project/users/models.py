import base64
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models

from .guid import new_guid

"""novos"""
from bs4 import BeautifulSoup
import requests
import simplejson as json
import sys
from lxml import etree
from urllib.parse import urlencode

string_types = str,


def path_to_base64(path):
    file = open(path, "rb")
    data = base64.b64encode(file.read())
    file.close()
    return data.decode("utf-8")


class Profile(models.Model):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="profile")
    orcid = models.CharField(max_length=16, default=None)
    bio = models.CharField(max_length=240)
    image = models.ImageField(upload_to="media/profile/avatar/")
    email_guid = models.CharField(max_length=40, default=new_guid)
    twitter_access_token = models.CharField(max_length=240)
    twitter_access_token_secret = models.CharField(max_length=240)
    reddit_refresh_token = models.CharField(max_length=240)
    orcid_search_token = models.CharField(max_length=240)

    def serialize(self):
        u = self.user
        p = self
        return {
            "user_id": u.id,
            "username": u.username,
            "orcid": p.orcid,
            "email": u.email,
            "bio": p.bio,
            "image_data": path_to_base64(p.image.path),
        }


class UserFollow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following_user")
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followed")


class Resource(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    url = models.URLField(blank=True)
    date = models.DateTimeField(default=datetime.now)

    def serialize(self):
        u = self.user
        r = self
        return {
            "id": r.id,
            "user_id": u.id,
            "title": r.title,
            "url": r.url,
            "interests": list(map(lambda ri: ri.interest, ResourceInterest.objects.filter(resource=self)))
        }


class ResourceInterest(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="interests")
    interest = models.CharField(max_length=50)


"""
class UserMentor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mentor")
"""
