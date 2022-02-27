from rest_framework.serializers import ModelSerializer
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
# User = get_user_model()
from .models import  User, Profile

class UserSerializer(UserCreateSerializer):
    class Meta:
        model = User 
        fields = ('id', 'email', 'username', 'password')

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'
