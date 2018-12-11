import time
from datetime import datetime

import tweepy
from django.apps import apps
from django.conf import settings
from django.forms import Form, ModelForm
from django.http import *
from os import remove, makedirs, path
import praw

from .guid import new_guid
from .decorators import require_login
from .forms import *
from .orcid import PublicAPI, MemberAPI

Profile = apps.get_model('users', 'Profile')


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
        if access_token is not None and access_token is not '' and access_token_secret is not None and access_token_secret is not '':
            if tweet_form.is_valid():
                text = tweet_form.cleaned_data['text']
                auth = tweepy.OAuthHandler(
                    settings.TWITTER_KEY, settings.TWITTER_SECRET)
                auth.set_access_token(access_token, access_token_secret)
                api = tweepy.API(auth)
                if "media" in request.FILES.keys():
                    media = request.FILES["media"]
                    filename = "media/temp/" + new_guid() + "_" + media.name
                    if not path.exists("media/temp"):
                        makedirs("media/temp")
                    with open(filename, 'wb+') as destination:
                        for chunk in media.chunks():
                            destination.write(chunk)
                    media = api.media_upload(filename)
                    time.sleep(2)
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
def get_orcid_info(request):
    orcAPI = PublicAPI(institution_key=settings.ORCID_KEY,
                       institution_secret=settings.ORCID_SECRET)

    orcid_id = request.user.profile.orcid
    summary = orcAPI.read_record_public(orcid_id, 'record', request.user.profile.orcid_search_token)

    profile_name = summary['person']['name']['given-names']['value'] + " " + summary['person']['name']['family-name'][
        'value']

    keywords = summary['person']['keywords']['keyword']
    interests = list()
    for keyword in keywords:
        interests.append(keyword['content'])

    research_units = summary['activities-summary']['employments']['employment-summary']
    units = list()
    for unit in research_units:
        units.append(unit['organization']['name'])

    final_array = []
    final_array.append(profile_name)
    final_array.append(interests)
    final_array.append(units)
    final_array.append(orcid_id)

    return final_array


@require_login
def get_posts(request):
    if request.method == "GET":
        max_posts = 8
        post_list = []
        if request.user.profile.reddit_refresh_token is not '':
            reddit = praw.Reddit(client_id=settings.REDDIT_CLIENT_ID,
                                 client_secret=settings.REDDIT_CLIENT_SECRET,
                                 refresh_token=request.user.profile.reddit_refresh_token,
                                 user_agent="web:WeSearchers:v0.1 (by /u/FabioGC)")
            subs = list(reddit.user.subreddits())
            namestr = subs[0].display_name
            for sub in subs[1:]:
                namestr += "+" + sub.display_name

            multi = reddit.subreddit(namestr)
            ls = list(multi.hot(limit=1000))
            for submission in ls[min(len(subs)*max_posts, 20)*int(request.GET["page"]):min(len(subs)*max_posts, 20)*(int(request.GET["page"])+1)]:
                submission_dict = {
                    "url": submission.shortlink,
                    "name": submission.author.name,
                    "title": submission.title,
                    "text": submission.selftext,
                    "date": datetime.fromtimestamp(submission.created),
                    "profile_pic_url": "http://i.imgur.com/sdO8tAw.png",
                    "score": submission.ups,
                    "subreddit": submission.subreddit.display_name,
                    "type": "reddit"
                }

                if hasattr(submission, "url"):
                    url = submission.url
                    if url.endswith(".jpg") or url.endswith(".png"):
                        submission_dict["media_url"] = submission.url
                post_list.append(submission_dict)

        auth = tweepy.OAuthHandler(
            settings.TWITTER_KEY, settings.TWITTER_SECRET)
        api = tweepy.API(auth)

        orcid_info = get_orcid_info(request)
        interests = orcid_info[1]
        for interest in interests:
            for tweet in list(tweepy.Cursor(api.search, rpp=max_posts, tweet_mode="extended", q=("%23" + interest),
                                       result_type='popular').pages(int(request.GET["page"])+1))[-1]:
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
                    tweet_dict["media_url"] = tweet.entities.get('media', [])[
                        0]["media_url"]
                post_list.append(tweet_dict)
        post_list.sort(key=lambda t: t["score"], reverse=True)
        post_list = post_list[:30]
        return JsonResponse(post_list, safe=False)
    else:
        return HttpResponseNotAllowed("Method not allowed")
