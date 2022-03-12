from rest_framework import serializers
from .models import  User, Profile, Project_define, Skill, Job_category, Project_bid

class UserSerializer(serializers.ModelSerializer):
    # profile='ProfileSerializer()'

    class Meta:
        model = User 
        fields = ['username', 'id']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_bid
        fields = '__all__'
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    skills = SkillSerializer(many=True)
    bidder_bids=ProjectBidSerializer(many=True)
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ProjectDefineSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    skills = SkillSerializer(many=True)
    # profile= ProfileSerializer()
    class Meta:
        model = Project_define
        fields = '__all__'

class ProjectViewSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    skills = SkillSerializer(many=True)
    class Meta:
        model = Project_define
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Job_category
        fields = '__all__'

