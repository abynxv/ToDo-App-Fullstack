import React from 'react';
import { CheckSquare, Clock } from 'lucide-react';
import { Task, UpdateTaskRequest } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: number, task: UpdateTaskRequest) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  const inProgressTasks = tasks.filter(task => task.status === 'In-Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* In-Progress Tasks */}
      {inProgressTasks.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              In Progress ({inProgressTasks.length})
            </h3>
          </div>
          <div className="space-y-4">
            {inProgressTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <CheckSquare className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Completed ({completedTasks.length})
            </h3>
          </div>
          <div className="space-y-4">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;