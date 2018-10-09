import datetime
from django.shortcuts import render
from django.http import *

from .decorators import require_login
from django.apps import apps
from .models import *
from .forms import *

UserInterest = apps.get_model('users', 'UserInterest')


@require_login
def post_comment(request):
    if request.method == "POST":
        try:
            comment_form = CommentPublishingForm(request.POST)
            article = Article.objects.filter(id=request.POST["article_id"]).first()
            if article is not None:
                if comment_form.is_valid():
                    comment = comment_form.save(commit=False)
                    comment.user = request.user
                    comment.article = article
                    comment.save()
                    return JsonResponse(comment.id, safe=False)
            else:
                return HttpResponseNotFound()
        except KeyError:
            return HttpResponseBadRequest("Request badly formatted")
        return HttpResponseBadRequest("Request badly formatted")
    else:
        return HttpResponseNotAllowed()


@require_login
def get_comment(request, comment_id):
    if request.method == "GET":
        comment = Comment.objects.filter(id=comment_id).first()
        if comment is not None:
            return JsonResponse(comment.serialize())
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed()


@require_login
def vote_view(request):
    if request.method == "POST":
        try:
            value = int(request.POST["vote"])
        except ValueError:
            return HttpResponseBadRequest()
        if any([value == 0, value == -1, value == 1]):
            article = Article.objects.filter(id=int(request.POST["article_id"])).first()
            if article is not None:
                vote = Vote.objects.filter(user=request.user, article=article).first()
                if vote is not None:
                    if value == 0:
                        vote.delete()
                    else:
                        vote.score = value
                        vote.save()
                else:
                    vote = Vote(score=value, user=request.user, article=article)
                    vote.save()
                return JsonResponse(vote.id, safe=False)
        return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed("Method not allowed")


@require_login
def get_article(request, article_id):
    if request.method == "GET":
        article = Article.objects.filter(id=article_id).first()
        if article is not None:
            return JsonResponse(article.serialize())
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed()


@require_login
def post_article(request):
    article_form = ArticlePublishingForm(request.POST)
    try:
        if article_form.is_valid():
            article = article_form.save(commit=False)
            tags = request.POST["tags"].split()
            for tag in tags:
                article_interest = ArticleInterest(interest=tag)
                article_interest.article = article
                article_interest.save()
            article.user = request.user
            article.save()
            return JsonResponse(article.id, safe=False)
        else:
            return HttpResponseBadRequest()
    except KeyError:
        return HttpResponseBadRequest("Request badly formatted")


@require_login
def comments_by_article(request, article_id):
    article = Article.objects.filter(id=article_id).first()
    if article is not None:
        comments = list(map(lambda comment : comment.serialize(), Comment.objects.filter(article=article)))
        return JsonResponse(comments, safe=False)
    else:
        return HttpResponseNotFound()


@require_login
def article_by_interests(request):
    def intersection_len(l1, l2):
        temp = set(l2)
        l3 = [value for value in l1 if value in temp]
        return len(l3)

    def match_count(interests, article):
        article_interests = list(map(lambda a: a.interest, ArticleInterest.objects.filter(article=article)))
        return intersection_len(interests, article_interests)

    user_interests = list(map(lambda interest: interest.interest, UserInterest.objects.filter(user=request.user)))
    articles = list(Article.objects.all())
    articles.sort(key=lambda x: x.score, reverse=True)
    articles.sort(key=lambda x: match_count(user_interests, x), reverse=True)
    final_list = list(map(lambda x: x.serialize(), articles))
    return JsonResponse(final_list, safe=False)
