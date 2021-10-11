from django.db import models
from django.conf import settings

# Create your models here.


class Fish(models.Model):
    spec = models.CharField(max_length=100)
    mean = models.CharField(max_length=100)


class Fishing(models.Model):
    name = models.CharField(max_length=100)
    pointName = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    category = models.IntegerField()
    longitude = models.CharField(max_length=100)  # longitude
    latitude = models.CharField(max_length=100)  # latitude
    dpwt = models.CharField(max_length=100)
    material = models.CharField(max_length=500)
    fishingImg = models.CharField(max_length=500)
    obsCode = models.CharField(max_length=500)
    obsPostId = models.CharField(max_length=500)
    caution = models.CharField(max_length=500)
    locInfo = models.CharField(max_length=500)
    nearPointName = models.CharField(max_length=500)
    fish = models.CharField(max_length=500)


class Scrap(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    fishing = models.ForeignKey(Fishing, on_delete=models.CASCADE)

    class Meta:
        db_table = 'scrap'


class Review(models.Model):
    fishing = models.ForeignKey(Fishing, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    reviewContent = models.CharField(max_length=1000, null=True)
    rating = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
