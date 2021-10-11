from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
# Create your models here.

class User(AbstractUser):
    username = models.CharField(unique=True, max_length=255, null=True, blank=True)
    nickname = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=100, blank=True)
    phonenumber = models.CharField(max_length=100, blank=True)
    profileimg = ProcessedImageField(
        upload_to="images/profile/",
        options={"quality": 60},
        default="default_profile.png",
    )
    introduce = models.CharField(max_length=500, blank=True)
    isadmin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

