from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('validate', views.validate),
    re_path('logincheck', views.is_logged_in),
    re_path('login', views.login_session),
    re_path('guidcheck', views.guid_check),
    re_path('resetpw', views.send_reset_password_email),
    re_path('reset', views.reset_password),
    re_path('password', views.change_password),
    re_path('followers', views.get_followers),
    re_path('following', views.get_following),
    re_path('redditauth',views.get_reddit_authentication_url),
    re_path('saveredditrequesttoken',views.save_reddit_request_token),
    re_path('twitterauth',views.get_twitter_authentication_url),
    re_path('savetwitteraccesstokens',views.save_twitter_access_tokens),
    # re_path('<int:user_id>/collaborators',views.get_collaborators),
    re_path('resource/delete', views.delete_resource),
    re_path('resource/gettags', views.resource_tags),
    re_path('resource/tags', views.resources_by_interest),
    re_path('resource',views.resource_view),
    re_path('follow', views.follow_view),
    path('profile/<int:user_id>', views.get_user_info),
    re_path('profile', views.update),
    re_path('register', views.register),
    re_path('logout', views.logout_view)
]
