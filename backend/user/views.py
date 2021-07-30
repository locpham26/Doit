from rest_framework.generics import ListCreateAPIView
from .serializers import AppUserSerializer
from .models import AppUser

class AppUserView(ListCreateAPIView):
  queryset = AppUser.objects.all()
  serializer_class = AppUserSerializer
