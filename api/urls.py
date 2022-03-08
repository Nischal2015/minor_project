from django.contrib import admin
from django.urls import path

from .import views

urlpatterns = [
    path('', views.api),
    path('home/', views.home, name="home"),
    path('users/', views.getUsers),
    path('users/<int:pk>/', views.getUser),
    path('profile/<int:pk>/', views.getProfile),
    path('profiles/', views.getProfiles),
    path('user-profile/', views.getUserProfile),
    path('user-profile/edit/', views.editUserProfile),
    path('login/', views.login, name='login'),
    path('jobs/', views.getJobs),
    path('postJob/', views.postJob),
    # path('jobList/', views.JobList),
    path('postBid/', views.postBid),
    path('bidList/', views.BidList),
    path('bid-detail/', views.YourBid),
    path('job/<int:pk>/', views.Job_detail),
    path('bidList/', views.BidList),
    path('skills/', views.getSkills),
    path('categories/', views.getCategories),
    path('khaltiPayment/', views.VerifyKhaltiPayment.as_view()),
    # path('room/<str:pk>',views.getRoom,name = "room"),
    # path('register/',views.dummyUserCreation,name = 'register'),
    # path('send-message/',views.sendMessage,name = 'send-message'),
    # path('create-room/',views.createRomm,name = 'create-room'),

]
