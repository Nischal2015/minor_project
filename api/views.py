from contextlib import nullcontext
import email
from django.shortcuts import render, redirect
from .models import User, Room, Message
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, RoomSerializer, MessageSerializer
from django.contrib.auth.decorators import login_required
from .forms import UserForm, RoomForm
from api import serializers

@api_view(['GET'])
def api(request):
    routes = [
        'GET /',
        'GET /user',
        'GET /users'
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

def index(request):
    return render(request, 'index.html')

def home(request):
    users = User.objects.all()
    # rooms = Room.objects.all()
    context = {'users':users}
    return render(request, 'api/home.html',context)




def login(request):
    pass

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    profiles = UserSerializer(users,many = True)

    return Response(profiles.data)

@api_view(['GET'])
def getUser(request, pk):
    note = User.objects.get(id=pk)
    serializer = UserSerializer(note, many=False)
    return Response(serializer.data)

# @api_view(['POST'])
# def registerUser(request):
#     form = UserForm()

#     if request.method == 'POST':
#         form = UserForm(request.POST)

#         if form.is_valid():
#             user = form.save(commit=False)
#             user.username = user.username.lower()
#             user.email = user.email.lower()
#             user.save()
#             login(request,user)
#             return redirect('') 

@api_view(['POST'])
# @login_required(login_url = login)
def registerUser(request):
    data = request.data
    form = UserForm(data)
    user = form.save(commit=False)

    user.username = user.username.lower()
    user.email = user.email.lower()
    user.save()
    login(request,user)
    serializer = UserSerializer(user)
    return Response(serializer)

   


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
