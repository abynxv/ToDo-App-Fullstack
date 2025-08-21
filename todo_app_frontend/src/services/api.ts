import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';

// Base URL for your Django API
// Common Django development ports: 8000, 8001, 3000
// Update this to match your backend URL if different
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      console.error(`Cannot connect to Django backend at ${API_BASE_URL}`);
      console.error('Please ensure your Django server is running on the correct port');
    }
    return Promise.reject(error);
  }
);

export const taskApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks/');
    return response.data;
  },

  // Create a new task
  createTask: async (task: CreateTaskRequest): Promise<Task> => {
    const response = await api.post<Task>('/tasks/', task);
    return response.data;
  },

  // Get a single task
  getTask: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}/`);
    return response.data;
  },

  // Update a task
  updateTask: async (id: number, task: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}/`, task);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}/`);
  },
};