from django.contrib import admin
from django.urls import path

from .import views

urlpatterns = [
    path('',views.api),
    path('home/',views.home,name = "home"),
    path('users/',views.getUsers),
    path('users/<str:pk>/',views.getUser),
    path('login/',views.login, name = 'login'),
    path('room/<str:pk>',views.getRoom,name = "room"),
    path('register/',views.dummyUserCreation,name = 'register'),
    
    path('signup/',views.RegisterView.as_view(),name = 'signup'),
    path('send-message/',views.sendMessage,name = 'send-message'),
    path('create-room/',views.createRomm,name = 'create-room'),

]
