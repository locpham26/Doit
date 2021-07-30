from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager
# Create your models here.

class AppUser(AbstractBaseUser):
  username = models.CharField(max_length=30, unique=True)

  objects = UserManager()

  USERNAME_FIELD = 'username'

  def __str__(self):
    return self.username


