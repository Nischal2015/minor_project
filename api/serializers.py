from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import  Message, User, Profile, Room 

class UserSerializer(UserCreateSerializer):
    class Meta:
        model = User 
        fields = ('id', 'email', 'username', 'password')



class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'

class RoomSerializer(ModelSerializer):
    # room_messages = MessageSerializer(many = True)
    
    class Meta:
        model = Room
        fields = '__all__'

class MessageSerializer(ModelSerializer):
    
    sender = UserSerializer(many = False)
    
    recipient = UserSerializer(many = False)
    room = RoomSerializer(many= False)
    class Meta:
        model = Message
        fields = '__all__'



