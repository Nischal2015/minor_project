from django.shortcuts import render, redirect
from .models import User, Profile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer
from api import serializers
from rest_framework import status
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib import messages


@api_view(['GET'])
def api(request):
    routes = [
        'GET /',
        'GET /user',
        'GET /users',
        'GET /login',
        'GET /room/:id',
        # 'GET /login',
        'POST /register',
        'POST /signup',
        'POST /create-room',
        'POST /send-message'
        # 'POST /create-post',
        # 'POST /bid',
        # 'PUT /update-user/<str:pk',
        # 'PUT /update-post/<str:pk'
    ]
    return Response(routes)



@api_view(['GET'])
def home(request):
    users = User.objects.all()
    context = {'users': users}
    return render(request, 'api/home.html', context)


<<<<<<< HEAD


@api_view(['POST'])
def login(request):
    #to prevent re-logging in if user is already logged in
    if request.user.is_authenticated:
        return Response('logged in')


    elif request.method == 'POST': 
        email = request.POST.get('email').lower()
        password = request.POST.get('password')
        print(email)
        
        #check is user exists or not
        try:
            email = User.objects.get(email = email)
        except:
            messages.error(request,'user doesnot exist')
        
        #if user exists
        user = authenticate(request,email = email, password=password)

        #if user is valid
        if user is not None:
            login(request,user)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            print('password is incorrect')
            messages.error(request,'incorrect password')
            return Response('user is not valid')

    # return Response(request,'base/login_register.html',context)

=======
>>>>>>> 3427e58bb3df6b7d60ed57e097370462e866f562
@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, pk):
    user = get_object_or_404(User, id = pk)
    # note = User.objects.get(id=pk)

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProfile(request, pk):
    profile = Profile.objects.get(user=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # token['password'] = user.password
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

