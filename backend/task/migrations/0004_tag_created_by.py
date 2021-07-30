# Generated by Django 3.2.5 on 2021-07-24 09:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('task', '0003_alter_task_due_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='user.appuser'),
            preserve_default=False,
        ),
    ]
