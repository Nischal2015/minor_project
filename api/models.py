from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=200, null = True) 
    email = models.EmailField(unique=True)
    bio = models.TextField(null=True)
    
    avatar = models.ImageField(null = True, default = "nepal.png")

    #hourly_rate 
    price = models.IntegerField(null = True)
    
    profile_title = models.TextField(null = True)
    rating = models.IntegerField(blank=True,null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now = True)
    
    #to specify about the interest of the client ( client or freelancer)
    INTEREST_CHOICES = (
        ('C', 'Client'),
        ('F', 'Freelancer'),
    )

    field1 = models.CharField(max_length=200,null = False, blank = True)
    field2 = models.CharField(max_length=200,null = False, blank = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class JobCategory(models.Model):
    name = models.CharField(max_length=200)














