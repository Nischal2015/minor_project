from django.shortcuts import render, redirect
from django.http.request import QueryDict
from django.shortcuts import get_object_or_404
from django.conf import settings
from .models import User, Profile, Project_define, Skill, Job_category, Project_bid
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import parser_classes
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.utils import encoders
from .serializers import ProfileEditSerializer, UserSerializer, ProfileSerializer, ProjectDefineSerializer, SkillSerializer, CategorySerializer, ProjectViewSerializer, ProjectBidSerializer
from api import serializers
from rest_framework.utils import encoders
import json
from django.contrib.auth import authenticate, login, logout

import requests
from django.contrib import messages
from rest_framework.views import APIView
from django.db.models import Q


import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'kamao.settings'


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
    # to prevent re-logging in if user is already logged in
    if request.user.is_authenticated:
        return Response('logged in')

    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
        print(username)

        # check is user exists or not
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'user doesnot exist')

        # if user exists
        user = authenticate(request, username=username, password=password)

        # if user is valid
        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return redirect(serializer.data)
        else:
            print('password is incorrect')
            messages.error(request, 'incorrect password')
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

@api_view(['POST'])
def getCurrentUser(request, pk):
    note = User.objects.get(id=pk)
    serializer = UserSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProfile(request, pk):
    note = Profile.objects.select_related('user').prefetch_related('skills').get(user=pk)
    serializer = ProfileSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def getProfiles(request):
    if request.method == 'GET':
        profiles = Profile.objects.select_related('user').prefetch_related('skills').all()
    elif request.method == 'POST':
        id = request.data["uid"]
        profiles = Profile.objects.select_related('user').prefetch_related('skills').exclude(user__id = id)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def getUserProfile(request):
    user_id = request.data['userId']
    print(user_id)
    query = Profile.objects.select_related('user').prefetch_related('skills').get(user=user_id)
    serializer = ProfileSerializer(query, many=False)
    return Response(serializer.data)

@api_view(['POST', 'PUT'])
def editUserProfile(request):
    print(request.data)
    new_request = QueryDict.copy(request.data)
    skill = request.data['skills'].split(',')
    new_request.setlist( 'skills', skill )
    if request.method == 'POST':
        serializer = ProfileEditSerializer(data=new_request)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response({'User Data Edited': new_request})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        query = Profile.objects.get(user=new_request["user"])
        serializer = ProfileEditSerializer(data=new_request, instance=query)
        if serializer.is_valid():
            serializer.save()
            return Response({'User Data Edited': new_request})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        # if not request.POST._mutable:
        #     request.POST._mutable = True
        # data = request.POST
        # split_data = data["skills"].split(",")
        # while len(split_data) == 1 and isinstance(split_data[0], list):
        #     split_data = split_data[0]


        # data['skills'] = split_data
        # serializer = ProjectDefineSerializer(data=data)
        # print("serializer=", serializer)
        # # print(request.FILES)
        # # print(serializer.initial_data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response({'received data': request.data})
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'POST':
            new_request = QueryDict.copy(request.data)
            skill = request.data['skills'].split(',')
            new_request.setlist( 'skills', skill )
            serializer = ProjectDefineSerializer(data=new_request)
            # print(request.FILES)
            print(serializer.initial_data)
            if serializer.is_valid():
                print("milan")
                serializer.save()
                return Response({'received data': new_request})
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
# @parser_classes([MultiPartParser,FormParser])
def postBid(request):
    if request.method == 'POST':
        print(request.data)
        serializer = ProjectBidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'received data': request.data})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def getJobs(request):
    print(request)
    if request.method == 'GET':
        project_define = Project_define.objects.select_related('creator').prefetch_related('skills').all()
    elif request.method == 'POST':
        id = request.data["creatorId"]
        if 'username' in request.data:
            project_define = Project_define.objects.select_related('creator').prefetch_related('skills').filter(creator_id = id)
        else: 
            project_define = Project_define.objects.select_related('creator').prefetch_related('skills').exclude(creator_id = id)
        
    serializer = ProjectViewSerializer(project_define,context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getJob(request, pk):
    project_define = Project_define.objects.get(id=pk)
    serializer = ProjectDefineSerializer(project_define, many=False)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def BidList(request):
    project_list = []
    user_id = request.data['bidderId']
    if request.method == 'POST':
        project_bid = Project_bid.objects.filter(bidder = user_id)
        for project in project_bid:
            query = Project_define.objects.get(id = project.project_define.id)
            project_list.append(query)
        serializer = ProjectDefineSerializer(project_list, many=True)
        return Response(serializer.data)

@api_view(['POST', 'GET'])
def YourBid(request):
    user_id = request.data['bidderId']
    project_id = request.data['projectId']
    if request.method == 'POST':
        query1 = Project_bid.objects.filter(bidder = user_id)
        query2 = query1.filter(project_define = project_id)
        serializer = ProjectBidSerializer(query2, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT'])
def Job_detail(request, pk):
    project_define = get_object_or_404(Project_define, pk=pk)
    if request.method == 'GET':
        serializer = ProjectDefineSerializer(
            project_define)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectDefineSerializer(
            project_define, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project_define.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VerifyKhaltiPayment(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data["token"]
        amount = request.data["amount"]

        payload = {
            "token": token,
            "amount": amount,
        }
        headers = {
            "Authorization": "Key {}".format(settings.KHALTI_SECRET_KEY)
        }
        try:
            response = requests.post(
                settings.KHALTI_VERIFY_URL, payload, headers=headers)
            if response.status_code == 200:
                return Response({
                    'status': True,
                    'details': response.json(),
                })

            else:
                return Response({
                    'status': False,
                    'details': response.json(),
                })

        except requests.exceptions.HTTPError as e:
            return Response({
                'status': False,
                'details': response.json(),
            })
