from django.urls import path
from .views import *


urlpatterns = [
    path("scrap/list/<int:userId>", ScrapList.as_view()),
    path("scrap/<int:fishingId>", fishingScrap.as_view()),
    path("<int:fishingId>", fishingDetail.as_view()),
    path("<int:fishingId>/review", reviewFishingIdList.as_view()),
    path("<int:fishingId>/review/create", reviewCreate.as_view()),
    path("<int:fishingId>/review/<int:reviewId>/update", reviewCRUD.as_view()),
    path("<int:fishingId>/review/<int:reviewId>/delete", reviewCRUD.as_view()),
    path("search/<str:location>", searchLoc.as_view()),
    path("search/fish/<str:fish>", searchFish.as_view()),
    path("search/auto/<str:location>", autoLoc.as_view()),
    path("search/auto/fish/<str:fish>", autoFish.as_view()),
    path("near/<str:longitude>/<str:latitude>", nearFishing.as_view()),
]
