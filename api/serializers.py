from rest_framework.serializers import ModelSerializer
from .models import Message, User, Room , Message, DummyUser

class UserSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'

        
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