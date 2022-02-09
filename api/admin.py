from django.contrib import admin
from .models import User, JobCategory, Room , Message, Profile


admin.site.register(User)
admin.site.register(JobCategory)
admin.site.register(Room)
admin.site.register(Message)
