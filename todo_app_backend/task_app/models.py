from django.db import models


class Task(models.Model):
    STATUS = (
        ('In-Progress','In-progress'),
        ('Completed','Completed')
    )
    task_name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS, default='In-Progress')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)