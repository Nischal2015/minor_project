from django.shortcuts import render
from .models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['GET'])
def api(request):
    routes = [
        'GET /',
        'GET /home',
        'GET /user'
    ]
    return Response(routes)

def home(request):
    users = User.objects.all()
    context = {'users':users}
    return render(request, 'api/home.html',context)

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    profiles = UserSerializer(users,many = True)

    return Response(profiles.data)





