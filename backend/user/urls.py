from .views import AppUserView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path('', AppUserView.as_view(), name='user-list-create'),
  path('login', TokenObtainPairView.as_view(), name='user-login'),
  path('token/refresh', TokenRefreshView.as_view(), name='refresh-token')
]