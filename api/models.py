from ast import mod
from re import T
from statistics import mode
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.forms import FileField

# Create your models here.


class User(AbstractUser):

    # manytomany column skill_set

    # avatar = models.ImageField(null = True, default = "nepal.png")
    avatar = models.ImageField(null=True, blank=True)

    username = models.CharField(max_length=255, null=True, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255, null=False)
    middle_name = models.CharField(max_length=512, null=True)
    last_name = models.CharField(max_length=255, null=False)

    profile_title = models.TextField(null=True)
    bio = models.TextField(null=True)
    dob = models.DateField()
    country = models.CharField(max_length=255, null=False)
    state = models.CharField(max_length=255, null=False)
    city = models.CharField(max_length=255, null=False)

    hourly_rate = models.PositiveIntegerField(null=True)
    hours_per_week = models.PositiveIntegerField(null=True)

    created = models.DateTimeField(auto_now_add=True)

    field1 = models.CharField(max_length=255, null=False, blank=True)
    field2 = models.CharField(max_length=255, null=False, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Skill(models.Model):

    # manytomany column job_category_set
    # manytomany column project_define_set
    users = models.ManyToManyField(User)

    skill_name = models.CharField(max_length=255, null=False)


class Job_category(models.Model):

    skills = models.ManyToManyField(Skill)

    job_name = models.CharField(max_length=255, null=False)


class Project_define(models.Model):

    creator = models.ForeignKey(User, on_delete=models.SET_NULL)
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
    freelancer = models.ForeignKey(User, on_delete=models.SET_NULL)

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
    critic = models.ForeignKey(User, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE)

    reliability = models.PositiveSmallIntegerField()
    punctuality = models.PositiveSmallIntegerField()
    communication = models.PositiveSmallIntegerField()
    quality_work = models.PositiveSmallIntegerField()
    comment = models.TextField()


class Project_document(models.Model):

    project = models.ForeignKey(Project_define, on_delete=models.CASCADE)

    document_name = models.CharField(max_length=255, null=False)
    document = FileField()


class Bid_document(models.Model):

    p
