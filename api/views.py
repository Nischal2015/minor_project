from django.shortcuts import render, redirect
from .models import User, Profile, Project_define
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, ProfileSerializer, ProjectDefineSerializer
from api import serializers

from django.contrib.auth import authenticate,login,logout

from django.contrib import messages


@api_view(['GET'])
def api(request):
    routes = [
        'GET /',
        'GET /user',
        'GET /users',
        'GET /room/:id',
        # 'GET /login',
        'POST /register',
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




@api_view(['POST'])
def login(request):
    #to prevent re-logging in if user is already logged in
    if request.user.is_authenticated:
        return Response('logged in')


    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
        print(username)
        
        #check is user exists or not
        try:
            user = User.objects.get(username = username)
        except:
            messages.error(request,'user doesnot exist')
        
        #if user exists
        user = authenticate(request,username = username, password=password)

        #if user is valid
        if user is not None:
            login(request,user)
            serializer = UserSerializer(user)
            return redirect(serializer.data)
        else:
            print('password is incorrect')
            messages.error(request,'incorrect password')
            return Response('user is not valid')

    # return Response(request,'base/login_register.html',context)

@api_view(['GET'])
def getUsers(request):

    users = User.objects.all()
    profiles = UserSerializer(users, many=True)

    return Response(profiles.data)


@api_view(['GET'])
def getUser(request, pk):
    note = User.objects.get(id=pk)
    serializer = UserSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProfile(request, pk):
    note = Profile.objects.get(user=pk)
    serializer = ProfileSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['POST','GET'])
def postJob(request):
    if request.method == 'GET':
        project_define = Project_define.objects.all()
        serializer = ProjectDefineSerializer(project_define, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProjectDefineSerializer(data=request.data)
        print("milan")
        print(serializer.initial_data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        else:
            print("milan")
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

