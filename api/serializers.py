from rest_framework.serializers import ModelSerializer
from .models import  User, Profile, Project_define

class UserSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = ['username']

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'

class ProjectDefineSerializer(ModelSerializer):
    class Meta:
        model = Project_define
        fields = '__all__'
