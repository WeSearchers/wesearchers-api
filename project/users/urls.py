from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('validate', views.validate),
    re_path('login', views.login_session),
    re_path('guidcheck', views.guid_check),
    re_path('resetpw', views.send_reset_password_email),
    re_path('reset', views.reset_password),
    re_path('password', views.change_password),
    re_path('followers', views.get_followers),
    re_path('following',views.get_following),
    re_path('collaborators',views.get_collaborators),
    re_path('editprofile',views.edit_profile),
    re_path('mentor',views.get_mentor),
    path('<int:user_id>', views.get_user_info),
    path('', views.index),
]
