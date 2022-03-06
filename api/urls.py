from django.contrib import admin
from django.urls import path

# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )
   
from .import views
# from .views import MyTokenObtainPairView

urlpatterns = [
    path('',views.api),
    path('users/',views.getUsers),
    path('users/<str:pk>/',views.getUser),
    path('profiles/<str:pk>/',views.getProfile),
    path('profiles/',views.getProfiles),
    # path('room/<str:pk>/',views.room),
    path('room/',views.room),
    path('messages/',views.getMessages),
    path('create-room/',views.createRoom),
    path('create-message/',views.createMessage),
    path('delete-messages/',views.deleteMessages),
    # path('room/<str:pk>/',views.Room),
]
