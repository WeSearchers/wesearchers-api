from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('validate', views.validate),
    re_path('guidcheck', views.guid_check),
    re_path('resetpw', views.send_reset_password_email),
    re_path('reset', views.reset_password),
    re_path('password', views.change_password),
    path('', views.index),
]
