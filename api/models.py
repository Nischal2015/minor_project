from ast import mod
from re import T
from statistics import mode
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=200, unique=True, default='~')
    email = models.EmailField(verbose_name='email',
                              max_length=150, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Profile(models.Model):

    # manytomany column skill_set

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

    avatar = models.ImageField(null=True, blank=True)

    first_name = models.CharField(max_length=255, null=False)
    middle_name = models.CharField(max_length=512, null=True)
    last_name = models.CharField(max_length=255, null=False)

    profile_title = models.TextField(null=True)
    bio = models.TextField(null=True)
    dob = models.DateField(null=True)
    country = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)

    hourly_rate = models.PositiveIntegerField(null=True)
    hours_per_week = models.PositiveIntegerField(null=True)

    created = models.DateTimeField(auto_now_add=True)

    field1 = models.CharField(max_length=255, null=False, blank=True)
    field2 = models.CharField(max_length=255, null=False, blank=True)


class Skill(models.Model):

    # manytomany column job_category_set
    # manytomany column project_define_set
    users = models.ManyToManyField(User)

    skill_name = models.CharField(max_length=255, null=False)


class Job_category(models.Model):

    skills = models.ManyToManyField(Skill)

    job_name = models.CharField(max_length=255, null=False)


class Project_define(models.Model):

    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    skills = models.ManyToManyField(Skill)

    project_title = models.CharField(max_length=255, null=False)
    project_description = models.TextField(null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    project_length = models.PositiveIntegerField(null=True)
    budget_min = models.DecimalField(max_digits=7, decimal_places=2)
    budget_max = models.DecimalField(max_digits=7, decimal_places=2)
    bid_deadline = models.DateTimeField(auto_now=False)


class Project(models.Model):
    STATUS_COMPLETED = 'C'
    STATUS_RUNNING = 'R'

    STATUS_CHOICES = [
        (STATUS_COMPLETED, 'completed'),
        (STATUS_RUNNING, 'running'),
    ]

    project_description = models.OneToOneField(
        Project_define, on_delete=models.CASCADE, primary_key=True)
    freelancer = models.ForeignKey(User, on_delete=models.PROTECT)

    project_start_date = models.DateTimeField(auto_now=False)
    running_duration = models.PositiveIntegerField()
    completion_date = models.DateTimeField(auto_now=False, null=True)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default=STATUS_RUNNING)


class Project_bid(models.Model):

    BID_PENDING = 'P'
    BID_ACCEPTED = 'A'
    BID_REJECTED = 'R'

    BID_CHOICES = [
        (BID_ACCEPTED, 'accepted'),
        (BID_PENDING, 'pending'),
        (BID_REJECTED, 'rejected'),
    ]

    project_define = models.ForeignKey(
        Project_define, on_delete=models.CASCADE)
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)

    min_offer = models.DecimalField(max_digits=7, decimal_places=2)
    max_offer = models.DecimalField(max_digits=7, decimal_places=2)
    offered_duration = models.PositiveIntegerField()
    bid_description = models.TextField(null=True)
    bid_status = models.CharField(
        max_length=1, choices=BID_CHOICES, default=BID_PENDING)


class Rating(models.Model):

    project = models.OneToOneField(
        Project, on_delete=models.CASCADE, primary_key=True)
    critic = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='rating_given')
    freelancer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='rating_received')

    reliability = models.PositiveSmallIntegerField()
    punctuality = models.PositiveSmallIntegerField()
    communication = models.PositiveSmallIntegerField()
    quality_work = models.PositiveSmallIntegerField()
    comment = models.TextField()


class Project_document(models.Model):

    project = models.ForeignKey(Project_define, on_delete=models.CASCADE)

    document_name = models.CharField(max_length=255, null=False)
    document = models.FileField(null=True)


class Bid_document(models.Model):

    project_bid = models.ForeignKey(Project_bid, on_delete=models.CASCADE)

    document_name = models.CharField(max_length=255, null=False)
    document = models.FileField(null=True)
