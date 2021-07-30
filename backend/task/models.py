from django.db import models
from django.conf import settings

class Tag(models.Model):
  title = models.CharField(max_length=30)
  color = models.CharField(max_length=30)
  created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tags')

# class Project(models.Model):
#   title = models.CharField(max_length=30)
#   color = models.CharField(default='#ff0000', max_length=30)
#   created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')

class Task(models.Model):
  PRIORITY_CHOICES = (
    (5, 'Extreme Priority'),
    (4, 'High Priority'),
    (3, 'Medium Priority'),
    (2, 'Low Priority'),
    (1, 'No Priority'),
  )
  title = models.CharField(max_length=255)
  description = models.TextField()
  created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
  created_at = models.DateTimeField(auto_now_add=True)
  due_at = models.DateTimeField(null=True, blank=True)
  priority = models.IntegerField(choices=PRIORITY_CHOICES, default=1)
  tags = models.ManyToManyField(Tag, related_name='tasks', blank=True)
  parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='subtasks', blank=True, null=True)
  # project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True, related_name='tasks')


