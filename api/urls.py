from django.contrib import admin
from django.urls import path

from .import views

urlpatterns = [
    path('', views.index),
    path('api/',views.api),
    path('users/',views.getUsers),
    path('users/<str:pk>/',views.getUser)
]
