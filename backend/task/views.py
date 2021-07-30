from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import TaskSerializer, TagSerializer, TaskCreateSerializer, TagCreateSerializer
from .models import Task, Tag
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import SAFE_METHODS
from django.utils import timezone


class TagView(ListCreateAPIView):
  queryset = Tag.objects.all()
  serializer_class = TagSerializer

  def create(self, request, *args, **kwargs):
    serializer = TagCreateSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(created_by=request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TagDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Tag.objects.all()
  serializer_class = TagSerializer

  def put(self, request, *args, **kwargs):
    serializer = TagCreateSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(created_by=request.user)
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ProjectView(ListCreateAPIView):
#   queryset = Project.objects.all()
#   serializer_class = ProjectSerializer

#   def create(self, request, *args, **kwargs):
#     serializer = ProjectCreateSerializer(data=request.data)
#     if serializer.is_valid():
#       serializer.save(created_by=request.user)
#       return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskView(ListCreateAPIView):
  serializer_class = TaskSerializer

  # def get(self, request, *args, **kwargs):
  #   queryset = self.get_queryset()
  #   now = timezone.now()
  #   queryset = queryset.filter(due_at__gte=now)
  #   tasks = queryset.all()
  #   serializer = TaskSerializer(queryset)


  def get_queryset(self):
    queryset = Task.objects.filter(created_by=self.request.user).filter(parent=None)
    tag = self.request.query_params.get('tag')
    priority = self.request.query_params.get('priority')
    if tag is not None:
      queryset = queryset.filter(tags=tag)
    if priority is not None:
      queryset = queryset.filter(priority=priority)
    return queryset

  def list(self, request, *args, **kwargs):
    now = timezone.now()
    queryset = self.get_queryset()
    active_tasks = queryset.filter(due_at__gt=now).order_by('priority')
    overdued_tasks = queryset.filter(due_at__lte=now).order_by('priority')
    active_serializer = TaskSerializer(active_tasks, many=True)
    overdued_serializer = TaskSerializer(overdued_tasks, many=True)
    return Response({"active": active_serializer.data, 
                     "overdued": overdued_serializer.data, 
                     "active_count": active_tasks.count(),
                     "overdued_count": overdued_tasks.count()}, status=status.HTTP_200_OK)

  def create(self, request, *args, **kwargs):
    serializer = TaskCreateSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(created_by=request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors)

class TaskDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer

  def get_serializer_class(self):
    if self.request.method not in SAFE_METHODS:
      return TaskCreateSerializer
    return TaskSerializer