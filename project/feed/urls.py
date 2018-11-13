"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('articlebyinterests', views.article_by_interests),
    path('article/<int:article_id>', views.get_article),
    path('commentsbyarticle/<int:article_id>', views.comments_by_article),
    path('comment/<int:comment_id>', views.get_comment),
    re_path('article', views.post_article),
    re_path('comment', views.post_comment),
    re_path('vote', views.vote_view),
    re_path('posts', views.get_posts),
    re_path('publish', views.publish),
]
