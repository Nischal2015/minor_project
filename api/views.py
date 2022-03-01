from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .models import User, Profile, Project_define, Skill, Job_category, Project_bid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import parser_classes
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.utils import encoders
from .serializers import UserSerializer, ProfileSerializer, ProjectDefineSerializer, SkillSerializer, CategorySerializer, ProjectBidSerializer
from api import serializers
from rest_framework.utils import encoders

from django.contrib.auth import authenticate,login,logout

from django.contrib import messages


@api_view(['GET'])
def api(request):
    routes = [
        'GET /',
        'GET /user',
        'GET /users',
        'GET /room/:id',
        'GET/project_define/',
        'GET/project_define/:id',
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

@api_view(['GET'])
def getSkills(request):
    skillslist = Skill.objects.all()
    serializer = SkillSerializer(skillslist, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategories(request):
    categories = Job_category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @parser_classes([MultiPartParser,FormParser])
def postJob(request):
    # if request.method == 'GET':
    #     project_define = Project_define.objects.all()
    #     serializer = ProjectDefineSerializer(project_define, many=True)
    #     return Response(serializer.data)
    # elif request.method == 'POST':
    #     print(request.data)
    #     serializer = ProjectDefineSerializer(data=request.data)
    #     print("milan")
    #     print(request.FILES)
    #     print(serializer.initial_data)
    #     if serializer.is_valid():
    #         print("milan")
    #         serializer.save()
    #         return Response({'received data': request.data})
    #     else:
    #         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        print(request.data)
        serializer = ProjectDefineSerializer(data=request.data)
        # print(request.FILES)
        # print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'received data': request.data})
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
# @parser_classes([MultiPartParser,FormParser])
def postBid(request):
    # if request.method == 'GET':
    #     project_bid = Project_bid.objects.all()
    #     serializer = ProjectBidSerializer(project_bid, many=True)
    #     return Response(serializer.data)
    # elif request.method == 'POST':
    #     print(request.data)
    #     serializer = ProjectBidSerializer(data=request.data)
    #     print("milan")
    #     print(serializer.initial_data)
    #     if serializer.is_valid():
    #         print("milan")
    #         serializer.save()
    #         return Response({'received data': request.data})
    #     else:
    #         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        print(request.data)
        serializer = ProjectBidSerializer(data=request.data)
        # print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'received data': request.data})
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def JobList(request):
    if request.method == 'GET':
        project_define = Project_define.objects.select_related()
        serializer = ProjectDefineSerializer(project_define,context={'request': request}, many=True)
        print(serializer.data)
        return Response(serializer.data)

@api_view(['GET'])
def BidList(request):
    if request.method == 'GET':
        project_bid = Project_bid.objects.all()
        serializer = ProjectBidSerializer(project_bid, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def Job_detail(request, pk):
    project_define = get_object_or_404(Project_define, pk=pk)
    # if request.method == 'GET':
    #     serializer = ProjectDefineSerializer(project_define, many=True)
    #     return Response(serializer.data)
    
    if request.method == 'GET':
        serializer = ProjectDefineSerializer(project_define,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectDefineSerializer(project_define, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project_define.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)