import base64
import datetime

from django.contrib.auth.models import User
from django.db import models


def path_to_base64(path):
    file = open(path, "rb")
    data = base64.b64encode(file.read())
    file.close()
    return data.decode("utf-8")


class Article(models.Model):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.date = datetime.date.today()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateField()
    media_url = models.URLField(null=True)
    image = models.ImageField(null=True, upload_to="media/articles/")
    url = models.URLField(null=True)

    def calc_score(self):
        temp = 0
        for vote in Vote.objects.filter(article=self):
            temp += vote.score
        return temp

    def serialize(self, user):
        user_vote = Vote.objects.filter(article=self, user=user).first()
        if user_vote is None:
            vote = 0
        else:
            vote = user_vote.score
        re = {
            "id": self.id,
            "user_id": self.user.id,
            "title": self.title,
            "text": self.text,
            "date": self.date,
            "base_score": self.calc_score() - vote,
            "media_url": self.media_url,
            "url": self.url,
            "interests": list(map(lambda x: x.interest, ArticleInterest.objects.filter(article=self))),
            "vote": vote
        }
        if self.image:
            re["image"] = path_to_base64(self.image.path)
        if self.url:
            re["url"] = self.url
        if self.media_url:
            re["media_url"] = self.media_url
        return re


class ArticleInterest(models.Model):
    interest = models.CharField(max_length=255)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="interests")


class Vote(models.Model):
    score = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="votes")


class Comment(models.Model):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.date = datetime.datetime.today()

    date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    text = models.CharField(max_length=7900)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comments")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "article_id": self.article.id,
            "text": self.text,
            "date": self.date
        }
