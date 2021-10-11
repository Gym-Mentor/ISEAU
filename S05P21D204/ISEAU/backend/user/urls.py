from django.urls import path
from .views import *
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('login', obtain_jwt_token),
    path('signup', Signup.as_view()),
    path('current', current_user.as_view()),
    path("modify/<int:user_pk>", ProfileUpdateAPI.as_view()),
    path("delete/<int:user_pk>", Delete.as_view()),
    path("email/uniquecheck", EmailUniqueCheck.as_view()),
    path("nickname/uniquecheck", NicknameUniqueCheck.as_view()),
    path("<int:userId>/review", reviewUserIdList.as_view()),
    path("check/password/<int:userId>", checkPassword.as_view()),
]
