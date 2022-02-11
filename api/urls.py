from django.contrib import admin
from django.urls import path

from .import views

urlpatterns = [

    path('admin/', admin.site.urls),
    path('',views.api),
    path('users/',views.getUsers),
    path('users/<str:pk>/',views.getUser),
    path('login/',views.login, name = 'login'),
    # path('room/<str:pk>',views.getRoom,name = "room"),
    # path('register/',views.dummyUserCreation,name = 'register'),
    # path('send-message/',views.sendMessage,name = 'send-message'),
    # path('create-room/',views.createRomm,name = 'create-room'),


]
