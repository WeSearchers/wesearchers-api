from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('validate', views.validate),
    re_path('update'), views.
    path('', views.index),
]
