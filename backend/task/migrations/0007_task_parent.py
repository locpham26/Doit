# Generated by Django 3.2.5 on 2021-07-24 10:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0006_task_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='subtasks', to='task.task'),
        ),
    ]
