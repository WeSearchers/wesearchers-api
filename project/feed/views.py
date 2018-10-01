import datetime
from django.shortcuts import render
from django.http import *
from django.validators import URLValidator

from .models import *
from .forms import *

def post_comment(request):
    comment_form = CommentPublishingForm(request.POST)
    try:
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.user = User.objects.filter(id=request.POST["user_id"]).first()
            comment.article = Article.objects.filter(id=request.POST["article_id"]).first()
            comment.save()
            return JsonResponse(comment.id, safe=False)
    except KeyError:
        return HttpResponseBadRequest("Request badly formatted")
    return HttpResponseBadRequest("Request badly formatted") 

def get_comment(request, params):
    comment = Comment.objects.filter(id=params["comment_id"]).first()
    if comment != None:
        return JsonResponse(comment.to_json())
    else:
        return HttpResponseNotFound()

def comment(request, params={}):
    if request.method == "POST":
        post_comment(request)
    elif request.method == "GET":
        get_comment(request, params)
    else:
        return HttpResponseNotAllowed("Method not allowed")

def vote(request):
    if request.method == "POST":
        if vote = Vote.objects.filter(score=bool(request.POST["vote"]), user=User.objects.filter(id=int(request.POST["user_id"])).first(), article=Article.objects.filter(id=int(request.POST["article_id"])).first()).first() is not None:
            if request.POST["vote"] == 0:
                vote.delete()
            else:
                vote.score = request.POST["vote"]
                if vote.score > 0:
                    vote.article.score += 2
                else
                    vote.article.score -= 2
                vote.article.save()
                vote.save()
        else:
            vote = Vote(score=bool(request.POST["vote"]), user=User.objects.filter(id=int(request.POST["user_id"])).first(), article=Article.objects.filter(id=int(request.POST["article_id"])).first())
            if vote.score > 0:
                vote.article.score++
            else:
                vote.article.score--
            vote.article.save()
            vote.save()
        return JsonResponse(vote.id, safe=False)
    else:
        return HttpResponseNotAllowed("Method not allowed")

def get_article(request, params):
    article = Article.objects.filter(id=params["article_id"]).first()
    if article != None:
        return JsonResponse(article.to_json())
    else:
        return HttpResponseNotFound()

def post_article(request):
    article_form = ArticlePublishingForm(request.POST)
    try:
        if article_form.is_valid():
            article = article_form.save(commit=False)
            tags = article_form.POST["tags"].split()
            for tag in tags:
                article_interest = ArticleInterest(interest=tag)
                article_interest.article = article
                article_interest.save()
            article.user = User.objects.filter(id=request.POST["user_id"]).first()
            article.save()
            return JsonResponse(article.id, safe=False)
    except KeyError:
        return HttpResponseBadRequest("Request badly formatted")
    return HttpResponseBadRequest("Request badly formatted")

def article(request, params={}):
    if request.method == "POST":
        post_article(request)
    elif request.method == "GET":
        get_article(request, params)
    else:
        return HttpResponseNotAllowed("Method not allowed")

def comments_by_article(request, params):
    article = Article.objects.filter(id=params["article_id"]).first()
    if article != None:
        comments = Comment.objects.filter(article__id=article.id)
        comm_list = []
        for comment in comments:
            comm_list.append(comment.serialize())
        return JsonResponse(comm_list, safe=False)
    else:
        return HttpResponseNotFound()

def article_by_interests(request, params):
    def intersection(l1, l2):
        temp = set(l2) 
        l3 = [value for value in l1 if value in temp] 
        return size(l3)
    user = User.objects.filter(id=params["user_id"]).first()
    if user != None:
        user_interests = list(map(lambda i: i.interest, UserInterest.objects.filter(id=user.id)))
        l = list(map(lambda a: [a, list((map(lambda y: y.interest, ArticleInterest.objects.filter(id=a.id))))], Article.objects))
        articles = list(filter(lambda x: intersection(x[1], user_interests) > 0, l))
        for i in articles:
            i[1] = intersection(i[1], user_interests)
        articles.sort(key=lambda x: (x[0].score, x), reverse=True)
        articles.sort(key=lambda x: (x[1], x), reverse=True)
        for item in article:
            final_list.append(item[0].serialize())
        return JsonResponse(final_list, safe=False)
    else:
        return HttpResponseNotFound()