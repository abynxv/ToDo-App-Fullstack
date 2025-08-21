from django.urls import path
from .views import TaskListView, TaskDetailView


urlpatterns = [
    path('tasks/', TaskListView.as_view()),
    path('tasks/<int:pk>/', TaskDetailView.as_view()),
]