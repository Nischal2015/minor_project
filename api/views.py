from email import message
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import User, Profile, Room, Message
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer, RoomSerializer, MessageSerializer
from api import serializers
from rest_framework import status
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import get_object_or_404
from .forms import RoomForm
from django.db.models import Q
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
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
        'GET / messages/<str:pk>',
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoom(request):
    room_id = request.data['room_id']
    room = Room.objects.get(id = room_id)
    serializer = RoomSerializer(room)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getMessages(request):
    room_id = request.data['room_id']
    recipient_id = request.data['recipient']

    #to check if request is for inbox or outbox
    message_request_type = ''
    room = Room.objects.get(id = room_id)
    # room_messages = room.message_set.all()
    sender = request.user
    recipient = User.objects.get(id = recipient_id)

    outbox = Message.objects.filter(
        Q(sender = sender, recipient = recipient) | 
        Q(sender = recipient, recipient = sender)  
        
        )


    inbox = Message.objects.filter(
        sender = recipient,
        recipient = sender
        )
    
    print('inbox - ',outbox)
    room_messages = outbox
    print("request data is - " , request.data)
    print("authorised user - ",sender)
    if request.method == 'POST':
        
        print(request.GET)

        serializer = MessageSerializer(room_messages, many = True)
        return Response(serializer.data)


    return Response(" Couldn't get messages - sorry brother :) - ")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoom(request):
    user = request.user
    print("authorised user - ",user)
    if request.method == 'POST':
        room = Room.objects.create(
            host = user ,
            topic = user.username,
            
        )
        print(request.POST)

        serializer = RoomSerializer(room, many = False)
        return Response(serializer.data)


    return Response(" Couldn't create room - sorry brother :) - ",user)
    # context = {'form':form}
    # return render(request,'base/room_form.html',context)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMessage(request):
    room_id = request.data['room_id']
    room = Room.objects.get(id = room_id)
    recipient_id = request.data['recipient']
    recipient = User.objects.get(id = recipient_id)
    print("request data is - " , request.data)
    sender = request.user
    print("authorised user - ",sender)
    if request.method == 'POST':
        message = Message.objects.create(
            text = request.data['text'] ,
            sender = sender,
            recipient = recipient,
            room = room
            
        )
        print(request.POST)

        serializer = MessageSerializer(message, many = False)
        return Response(serializer.data)


    return Response(" Couldn't create room - sorry brother :) - ")
    # context = {'form':form}
    # return render(request,'base/room_form.html',context)


@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def room(request):
    user = request.user 
    rooms = user.room_set.all()
    serializedObj = RoomSerializer(rooms,many = True)
    print('create message user - ',user)

    return Response(serializedObj.data)

# @api_view(['GET'])
def deleteMessages(request):
    messages = Message.objects.all()
    messages.delete()
    return JsonResponse('message deleted',safe = False)






