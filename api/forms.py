from dataclasses import fields
from django.forms import ModelForm
from .models import User, Room

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = '__all__'

class RoomForm(ModelForm):
    class Meta:
        model = Room 
        fields = "__all__"
        exclude = ['clientUser','freelancerUser']