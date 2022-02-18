from rest_framework import serializers
from .models import  User, Profile, Project_define, Skill, Job_category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['username']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'

class ProjectDefineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_define
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Job_category
        fields = '__all__'
