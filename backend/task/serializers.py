from rest_framework import serializers
from .models import Tag, Task
from user.serializers import AppUserSerializer

# tag 

class TagSerializer(serializers.ModelSerializer):
  created_by = AppUserSerializer()
  class Meta:
    model = Tag
    fields = '__all__'

class TagCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ('title', 'color',)

# project

# class ProjectCreateSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Project
#     fields = ('title', 'color',)

# class ProjectSerializer(serializers.ModelSerializer):
#   created_by = AppUserSerializer()
#   class Meta:
#     model = Project
#     fields = '__all__'

# task

class TaskSerializer(serializers.ModelSerializer):
  created_by = AppUserSerializer()
  class Meta:
    model = Task
    fields = '__all__'
    depth = 1

  def get_fields(self):
    fields = super(TaskSerializer, self).get_fields()
    fields['subtasks'] = TaskSerializer(many=True)
    return fields

  def to_representation(self, instance):
    representation = super().to_representation(instance)
    representation['subtask_count'] = instance.subtasks.count() 
    return representation

class TaskCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ('title', 'description', 'priority', 'due_at', 'parent', 'tags')

