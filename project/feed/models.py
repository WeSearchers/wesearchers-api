from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class Article(models.Model):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.date = datetime.date.today()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateField()
    media_url = models.URLField(blank=True)
    image = models.ImageField(blank=True, upload_to="media/articles/")
    url = models.URLField(blank=True)

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
        return {
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

    date = models.DateTimeField(default=datetime.now)
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
