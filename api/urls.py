from django.contrib import admin
from django.urls import path

from .import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('api/',views.api),
    path('users/',views.getUsers)
]
