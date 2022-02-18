from ast import mod
from fileinput import filename
from re import T
from statistics import mode
from django.conf import settings
from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'kamao.settings'


# model_manager for User
class Account_manager(BaseUserManager):
    def create_user(self, email, username, password):
        if not email:
            raise ValueError("User must have email address")
        if not username:
            raise ValueError("User must have a username")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# def get_profile_image_filepath(self):
#     return f'profile_images/{self.pk}/{"profile_image.png"}'

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email',
                              max_length=150, unique=True)
    username = models.CharField(max_length=200, unique=True)
    hide_email = models.BooleanField(default=True)

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = Account_manager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True


class Profile(models.Model):

    # manytomany column skill_set


    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

    first_name = models.CharField(max_length=255, null=False)
    middle_name = models.CharField(max_length=512, null=True)
    last_name = models.CharField(max_length=255, null=False)

    avatar = models.ImageField(
        max_length=255, upload_to=settings.MEDIA_ROOT/'profile_images/', null=True, blank=True)

    profile_title = models.TextField(null=True)
    bio = models.TextField(null=True)
    dob = models.DateField(null=True)
    country = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)

    # skills = models.ManyToManyField('Skill')

    hourly_rate = models.PositiveIntegerField(null=True)
    hours_per_week = models.PositiveIntegerField(null=True)

    created = models.DateTimeField(auto_now_add=True)

    # def get_profile_image_filename(self):
    #     return str(self.avatar)[str(self.avatar).index(f'profile_images/{self.pk}/'):]

    field1 = models.CharField(max_length=255, null=False, blank=True)
    field2 = models.CharField(max_length=255, null=False, blank=True)


    def __str__(self):
        return self.first_name

class Skill(models.Model):

    # manytomany column job_category_set
    # manytomany column project_define_set
    # users = models.ManyToManyField(User)
    profile = models.ManyToManyField(Profile)

    skill_name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.skill_name

class Job_category(models.Model):

    skills = models.ManyToManyField(Skill)

    job_name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.job_name


class Project_define(models.Model):

    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    skills = models.ManyToManyField(Skill)

    project_title = models.CharField(max_length=255, null=False)
    project_description = models.TextField(null=True)
    job_category = models.ForeignKey(
        Job_category, null=True, on_delete=models.SET_NULL)
    creation_date = models.DateTimeField(auto_now_add=True)
    project_length = models.PositiveIntegerField(null=True)
    budget_min = models.DecimalField(max_digits=7, decimal_places=2)
    budget_max = models.DecimalField(max_digits=7, decimal_places=2)
    bid_deadline = models.DateTimeField(auto_now=False)

    def __str__(self):
        return self.project_title

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

    # def __str__(self):
    #     return self.freelancer


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

    def __str__(self):
        return  f'{self.bidder}' + ' - ' + f'{self.project_define}'

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

    def __str__(self):
        return self.freelancer


class Project_document(models.Model):

    project = models.ForeignKey(Project_define, on_delete=models.CASCADE)

    document_name = models.CharField(max_length=255, null=False)
    document = models.FileField(
        null=True, upload_to=settings.MEDIA_ROOT/'project_documents/')


class Bid_document(models.Model):

    project_bid = models.ForeignKey(Project_bid, on_delete=models.CASCADE)

    document_name = models.CharField(max_length=255, null=False)
    document = models.FileField(
        null=True, upload_to=settings.MEDIA_ROOT/'bid_documents/')
