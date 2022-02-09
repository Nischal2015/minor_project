from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=200, null = True, blank=True) 
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    description = models.TextField(null=True)
    
    # avatar = models.ImageField(null = True, default = "nepal.png")
    avatar = models.ImageField(null = True, blank=True)

    #hourly_rate 
    price = models.IntegerField(null = True)
    
    profile_title = models.TextField(null = True, blank = True)
    rating = models.IntegerField(blank=True,null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now = True)
    
    #to specify about the interest of the client ( client or freelancer)
    INTEREST_CHOICES = (
        ('C', 'Client'),
        ('F', 'Freelancer'),
    )

    # extra fields for backup
    field1 = models.CharField(max_length=200,null = False, blank = True)
    field2 = models.CharField(max_length=200,null = False, blank = True)
    field3 = models.CharField(max_length=200,null = False, blank = True)

class JobCategory(models.Model):
    name = models.CharField(max_length=200)
    
    # extra fields for backup
    field1 = models.CharField(max_length=200,null = False, blank = True)
    field2 = models.CharField(max_length=200,null = False, blank = True)

class Room(models.Model):
    # yo chai kun post ko lagi message room create garne vanne ho JobPost model create vayo vane topic field lai uncomment garne
    # topic = models.ForeignKey(JobPost,on_delete=models.CASCADE)
    clientUser = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200, default= 'Room for message')

    freelancerUser = models.OneToOneField(User,related_name='freelancerUser',on_delete=models.SET_NULL,null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    # extra fields for backup
    field1 = models.CharField(max_length=200,null = False, blank = True)
    field2 = models.CharField(max_length=200,null = False, blank = True)

    def __str__(self):
        return self.title

class Message(models.Model):

    #sender
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    #references to which room
    room = models.ForeignKey(Room,on_delete=models.CASCADE)
    
    #actual message
    body = models.TextField()
    
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body

class DummyUser(models.Model):
    # username = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length = 50)

    def __str__(self):
        return self.email










