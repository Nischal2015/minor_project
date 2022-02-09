from ast import Import
from tkinter.tix import InputOnly
from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class Account_admin(UserAdmin):
    list_display = ('email', 'username', 'is_superuser', 'is_admin')
    search_fields = ('email', 'username')
    readonly_fields = ('id', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(User, Account_admin)
admin.site.register(Profile)
admin.site.register(Job_category)
admin.site.register(Project_define)
admin.site.register(Project)
admin.site.register(Project_bid)
admin.site.register(Skill)
admin.site.register(Rating)
admin.site.register(Bid_document)
admin.site.register(Project_document)
