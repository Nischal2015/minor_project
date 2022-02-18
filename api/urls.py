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
    path('login/',views.login, name = 'login'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]
