from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Message, User, Room , Message, DummyUser


class UserSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'

class RegisterSerializer(ModelSerializer):

    password = serializers.CharField(
        max_length = 68,min_length = 6,write_only = True)
    

    class Meta:
        model = User 
        fields = ['username','email','password']

    def validate(self,attrs):

        username = attrs.get('username','')
        email = attrs.get('email','')

        return attrs

    def create(self,validated_data):
        return User.objects.create(**validated_data)
        

        
    # def save(self):
    #     user = User(
    #         email = self.validated_data['email'],
    #         username = self.validated_data['username'],
    #     )

    #     password = self.validated_data['password']
    #     user.set_password(password)
    #     user.save()
    #     return user

        
class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room 
        fields = '__all__'

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message 
        fields = '__all__'

class DummyUserSerializer(ModelSerializer):
    class Meta:
        model = DummyUser
        fields = '__all__'