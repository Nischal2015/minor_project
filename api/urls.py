from django.contrib import admin
from django.urls import path

from .import views

urlpatterns = [
    path('',views.api),
    path('home/',views.home,name = "home"),
    path('users/',views.getUsers),
    path('users/<str:pk>/',views.getUser),
    path('profile/<str:pk>/',views.getProfile),
    path('profiles/',views.getProfiles),
    # path('room/<str:pk>',views.getRoom,name = "room"),
    # path('register/',views.dummyUserCreation,name = 'register'),
    # path('send-message/',views.sendMessage,name = 'send-message'),
    # path('create-room/',views.createRomm,name = 'create-room'),

]
