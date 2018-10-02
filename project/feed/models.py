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
    score = models.IntegerField()
    url = models.URLField()

    def update_score(self):
        temp = 0
        for vote in Vote.objects.filter(article__id=self.id):
            if vote.score:
                temp += 1
            else:
                temp -= 1
        self.score = temp
        self.save()

    def serialize(self):
        return {
            "user_id": self.user.id,
            "title": self.title,
            "text": self.text,
            "date": self.date,
            "score": self.score,
            "url": self.url
        }


class ArticleInterest(models.Model):
    interest = models.CharField(max_length=255)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)


class Vote(models.Model):
    score = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=7900)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    def serialize(self):
        return {
            "user_id": self.user.id,
            "article_id": self.article.id,
            "text": self.text
        }
