import base64
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models
from django.conf import settings

from .guid import new_guid


class Institution(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="media/institution/logo/")


def path_to_base64(path):
    file = open(path, "rb")
    data = base64.b64encode(file.read())
    file.close()
    return data.decode("utf-8")


class Profile(models.Model):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="profile")
    orcid = models.CharField(max_length=16)
    institution = models.ForeignKey(Institution, models.CASCADE)
    bio = models.CharField(max_length=240)
    image = models.ImageField(upload_to="media/profile/avatar/")
    email_guid = models.CharField(max_length=40, default=new_guid)
    twitter_access_token = models.CharField(max_length=240, default="")
    twitter_access_token_secret = models.CharField(max_length=240,default="")

    def serialize(self):
        u = self.user
        p = self
        return {
            "user_id": u.id,
            "username": u.username,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "email": u.email,
            "orcid": p.orcid,
            "bio": p.bio,
            "image_data": path_to_base64(p.image.path),
            "institution": p.institution_id,
            "interests": list(map(lambda i: i.interest, list(UserInterest.objects.filter(user=u)))),
            "twitter_access_token": p.twitter_access_token,
            "twitter_access_token_secret": p.twitter_access_token_secret,
        }


class UserInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="interests")
    interest = models.CharField(max_length=50)


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
