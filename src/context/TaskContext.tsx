import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string, description: string, priority: Priority) => void;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEY = '@taskmanager_tasks';

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Persist tasks to AsyncStorage whenever they change
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(
        (error) => console.error('Failed to save tasks:', error)
      );
    }
  }, [tasks, loading]);

  const addTask = useCallback(
    (title: string, description: string, priority: Priority) => {
      const newTask: Task = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    []
  );

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const updateTask = useCallback(
    (id: string, title: string, description: string, priority: Priority) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, title: title.trim(), description: description.trim(), priority }
            : task
        )
      );
    },
    []
  );

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, updateTask, loading }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
