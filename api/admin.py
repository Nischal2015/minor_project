from django.contrib import admin
from .models import User, JobCategory


admin.site.register(User)
admin.site.register(JobCategory)