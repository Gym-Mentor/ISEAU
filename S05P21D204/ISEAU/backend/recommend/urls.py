from django.urls import path
from .views import recommendList


urlpatterns = [
    path("category/<int:userId>/<int:categoryId>", recommendList.as_view()),
]