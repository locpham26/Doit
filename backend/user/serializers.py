from rest_framework import serializers
from .models import AppUser

class AppUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = AppUser
    fields = ('id', 'username', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    password = validated_data.pop('password')
    user = AppUser(**validated_data)
    user.set_password(password)
    user.save()
    return user