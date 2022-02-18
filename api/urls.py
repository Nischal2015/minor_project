from django.contrib import admin
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
   
from .import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path('',views.api),
    path('users/',views.getUsers),
    path('users/<str:pk>/',views.getUser),
    path('profile/<str:pk>/',views.getProfile),
    path('profiles/',views.getProfiles),
    

]
