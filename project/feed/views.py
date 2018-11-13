import tweepy
from django.apps import apps
from django.conf import settings
from django.forms import Form
from django.http import *
from os import remove
import praw

from .guid import new_guid
from .decorators import require_login
from .forms import *
from .models import *

Profile = apps.get_model('users', 'Profile')
UserInterest = apps.get_model('users', 'UserInterest')


def error_dict(*args):
    final = dict()
    for item in args:
        if item is not None:
            if issubclass(type(item), ModelForm) or issubclass(type(item), Form):
                errors = dict()
                for error in item.errors.keys():
                    errors[error] = item.errors[error][0]
                final = {**final, **errors}
            else:
                final = {**final, **item}
    return final


@require_login
def publish(request):
    if request.method == "POST":
        errors = {}
        access_token = request.user.profile.twitter_access_token
        access_token_secret = request.user.profile.twitter_access_token_secret
        tweet_form = TweetPublishingForm(request.POST, request.FILES)
        if access_token is not None and access_token_secret is not None:
            if tweet_form.is_valid():
                text = tweet_form.cleaned_data['text']
                auth = tweepy.OAuthHandler(settings.TWITTER_KEY, settings.TWITTER_SECRET)
                auth.set_access_token(access_token, access_token_secret)
                api = tweepy.API(auth)
                if "media" in request.FILES.keys():
                    media = request.FILES["media"]
                    filename = "media/temp/" + new_guid() + "_" + media.name
                    with open(filename, 'wb+') as destination:
                        for chunk in media.chunks():
                            destination.write(chunk)
                    media = api.media_upload(filename)
                    api.update_status(status=text, media_ids=[media.media_id])
                    remove(filename)
                else:
                    api.update_status(status=text)
                return HttpResponse()
        else:
            errors["text"] = "Account not bound! Connect your twitter profile in your profile page"
        return JsonResponse(error_dict(tweet_form, errors), status=400)
    else:
        return HttpResponseNotAllowed()


@require_login
def post_comment(request):
    if request.method == "POST":
        errors = {}
        comment_form = CommentPublishingForm(request.POST)
        try:
            article = Article.objects.filter(id=int(request.POST["article_id"])).first()
            if article is not None:
                if comment_form.is_valid():
                    comment = comment_form.save(commit=False)
                    comment.user = request.user
                    comment.article = article
                    comment.save()
                    return JsonResponse(comment.id, safe=False)
            else:
                errors["article_id"] = "article does not exist"
        except KeyError as k:
            return JsonResponse(
                error_dict(comment_form, errors, {k.args[0]: "field missing in form"}), status=400)
        return JsonResponse(
            error_dict(comment_form, errors), status=400)
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
            return JsonResponse({"vote": "vote must be an integer"}, status=400)
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
            else:
                return JsonResponse({"article_id": "article does not exist"}, status=400)
        else:
            return JsonResponse({"vote": "vote must be either -1, 0 or 1"}, status=400)
    else:
        return HttpResponseNotAllowed("Method not allowed")


@require_login
def get_article(request, article_id):
    if request.method == "GET":
        article = Article.objects.filter(id=article_id).first()
        if article is not None:
            return JsonResponse(article.serialize(request.user))
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed()


@require_login
def post_article(request):
    if request.method == "POST":
        article_form = ArticlePublishingForm(request.POST)
        try:
            if article_form.is_valid():
                article = article_form.save(commit=False)
                article.user = request.user
                article.save()
                tags = request.POST["tags"].split()
                for tag in tags:
                    article_interest = ArticleInterest(interest=tag)
                    article_interest.article = article
                    article_interest.save()
                return JsonResponse(article.id, safe=False)
            else:
                return JsonResponse(
                    error_dict(article_form), status=400)
        except KeyError as k:
            return JsonResponse(
                error_dict(article_form, {k.args[0]: "field missing in form"}), status=400)
    else:
        return HttpResponseNotAllowed()


@require_login
def comments_by_article(request, article_id):
    article = Article.objects.filter(id=article_id).first()
    if article is not None:
        comments = list(map(lambda comment: comment.serialize(), Comment.objects.filter(article=article)))
        comments.sort(key=lambda x: x["date"], reverse=True)
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
    articles.sort(key=lambda x: x.calc_score(), reverse=True)
    articles.sort(key=lambda x: match_count(user_interests, x), reverse=True)
    final_list = list(map(lambda x: x.serialize(request.user), articles))
    return JsonResponse(final_list, safe=False)


@require_login
def get_posts(request):
    if request.method == "GET":
        max_posts = 8
        post_list = []
        if request.user.profile.reddit_refresh_token is not None:
            reddit = praw.Reddit(client_id=settings.REDDIT_CLIENT_ID,
                                 client_secret=settings.REDDIT_CLIENT_SECRET,
                                 refresh_token=request.user.profile.reddit_refresh_token,
                                 user_agent="web:WeSearchers:v0.1 (by /u/FabioGC)")

            for subreddit in reddit.user.subreddits():
                for submission in subreddit.hot(limit=max_posts):
                    submission_dict = {
                        "url": submission.shortlink,
                        "name": submission.author.name,
                        "title": submission.title,
                        "text": submission.selftext,
                        "date": datetime.fromtimestamp(submission.created),
                        "profile_pic_url": "http://i.imgur.com/sdO8tAw.png",
                        "score": submission.ups,
                        "ratio": str(round(submission.upvote_ratio * 100)) + "%",
                        "subreddit": subreddit.display_name,
                        "type": "reddit"
                    }

                    if hasattr(submission, "url"):
                        url = submission.url
                        if url.endswith(".jpg") or url.endswith(".png"):
                            submission_dict["media_url"] = submission.url
                    post_list.append(submission_dict)

        auth = tweepy.OAuthHandler(settings.TWITTER_KEY, settings.TWITTER_SECRET)
        api = tweepy.API(auth)
        for interest in UserInterest.objects.filter(user=request.user):
            for tweet in tweepy.Cursor(api.search, tweet_mode="extended", q=("%23" + interest.interest),
                                       result_type='popular').items(
                    max_posts):
                if hasattr(tweet, 'retweeted_status'):
                    tweet = tweet.retweeted_status
                tags = list()
                for tag in tweet.entities.get('hashtags'):
                    tags.append(tag["text"])
                tweet_dict = {
                    "url": "https://twitter.com/" + tweet.user.screen_name + "/status/" + str(tweet.id),
                    "name": tweet.user.name,
                    "text": tweet.full_text,
                    "date": tweet.created_at,
                    "profile_pic_url": tweet.user.profile_image_url,
                    "fav_count": tweet.favorite_count,
                    "score": tweet.favorite_count,
                    "ret_count": tweet.retweet_count,
                    "tags": tags,
                    "type": "twitter"
                }

                if len(tweet.entities.get('media', [])) > 0:
                    tweet_dict["media_url"] = tweet.entities.get('media', [])[0]["media_url"]
                post_list.append(tweet_dict)
        post_list.sort(key=lambda t: t["score"], reverse=True)
        post_list = post_list[:30]
        return JsonResponse(post_list, safe=False)
    else:
        return HttpResponseNotAllowed("Method not allowed")
