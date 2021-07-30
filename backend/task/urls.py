from django.urls import path
from .views import TagDetailView, TaskDetailView, TaskView, TagView

urlpatterns = [
  path('task', TaskView.as_view(), name='task-list-create'),
  path('tag', TagView.as_view(), name='tag-list-create'),
  path('tag/<int:pk>', TagDetailView.as_view(), name='tag-retrieve-update-delete'),
  path('task/<int:pk>', TaskDetailView.as_view(), name='task-retrieve-update-delete')
  # path('project', ProjectView.as_view(), name='project-list-create')
]