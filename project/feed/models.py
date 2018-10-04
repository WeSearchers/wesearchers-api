import datetime

from django.contrib.auth.models import User
from django.db import models


class Article(models.Model):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.date = datetime.date.today()
        self.score = 0

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateField()
    url = models.URLField()

    def calc_score(self):
        temp = 0
        for vote in Vote.objects.filter(article=self):
            temp += vote.score
        return temp

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "title": self.title,
            "text": self.text,
            "date": self.date,
            "score": self.calc_score(),
            "url": self.url
        }


class ArticleInterest(models.Model):
    interest = models.CharField(max_length=255)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="interests")


class Vote(models.Model):
    score = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="votes")


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    text = models.CharField(max_length=7900)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comments")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "article_id": self.article.id,
            "text": self.text
        }