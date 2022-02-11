from contextlib import nullcontext
import email
from logging import raiseExceptions
from telnetlib import STATUS
from rest_framework import generics
from django.shortcuts import render, redirect
from .models import DummyUser, User, Room, Message
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, RoomSerializer, MessageSerializer, DummyUserSerializer,RegisterSerializer
from django.contrib.auth.decorators import login_required
from .forms import UserForm, RoomForm
from api import serializers
from rest_framework import status
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import get_object_or_404

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
        'POST /signup',
        'POST /create-room',
        'POST /send-message'
        # 'POST /create-post',
        # 'POST /bid',
        # 'PUT /update-user/<str:pk',
        # 'PUT /update-post/<str:pk'
    ]
    return Response(routes)

def index(request):
    return render(request, 'index.html')

def home(request):
    users = User.objects.all()
    # rooms = Room.objects.all()
    context = {'users':users}
    return render(request, 'api/home.html',context)



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
    profiles = UserSerializer(users,many = True)

    return Response(profiles.data)

@api_view(['GET'])
def getUser(request, pk):
    note = get_object_or_404(User, id = pk)
    # note = User.objects.get(id=pk)

    serializer = UserSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        serializer = UserSerializer(data = request.data)
        data = {}

        if serializer.is_valid():
            user = serializer.save()
            login(request,user)
            data['response'] = "Guys ! ,  User was successfully registered"
            data['username'] = user.username 
            data['email'] = user.email 
        else:
            data = serializer.errors 
        
        return Response(data)

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request):
        data = request.data
        serializer = self.serializer_class(data = data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        # login(request,serializer)

        user_data = serializer.data 

        return Response(user_data, status = status.HTTP_201_CREATED)




    
  


@api_view(['GET'])
def getRoom(request,pk):
    room = Room.objects.get(id = pk)
    serializer = RoomSerializer(room)
    return Response(serializer.data)

@api_view(['POST'])
def sendMessage(request,pk):
    #id should be room id , kun room ma pathako vanera
    room = Room.objects.get(id = pk)
    if request.method == 'POST':
        data = request.data
        message = Message.objects.create( 
            user = request.user,
            room = room,
            body = data['body']
        )

        serializer = MessageSerializer(message)
        return Response(serializer.data)

@api_view(['POST'])
# @login_required(login_url = login)
def createRomm(request):
    data = request.data
    room = Room.objects.create(
        clientUser = data['clientUser'],
        title = data['title']
    )

    serializer = RoomSerializer(room)
    return Response(serializer.data)
@api_view(['POST'])
def dummyUserCreation(request):
    data = request.data
    dummyuser = DummyUser.objects.create(
        # username = data['username'],
        email = data['email'],
        password = data['password']
    )
    serializer = DummyUserSerializer(dummyuser, many=False)
    return Response(serializer.data)
