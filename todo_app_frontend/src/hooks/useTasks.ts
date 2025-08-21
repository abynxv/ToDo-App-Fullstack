import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';
import { taskApi } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please check if your Django server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData: CreateTaskRequest): Promise<boolean> => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return true;
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      return false;
    }
  };

  const updateTask = async (id: number, taskData: UpdateTaskRequest): Promise<boolean> => {
    try {
      setError(null);
      const updatedTask = await taskApi.updateTask(id, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
      return true;
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      return false;
    }
  };

  const deleteTask = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};