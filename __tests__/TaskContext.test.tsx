import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { TaskProvider, useTasks, Priority } from '../src/context/TaskContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TaskProvider>{children}</TaskProvider>
);

describe('TaskContext', () => {
  it('initialises with empty task list', async () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.tasks).toEqual([]);
  });

  it('adds a new task', async () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask('Buy groceries', 'Milk and eggs', 'medium');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Buy groceries');
    expect(result.current.tasks[0].priority).toBe('medium');
    expect(result.current.tasks[0].completed).toBe(false);
  });

  it('toggles task completion', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask('Test task', '', 'low');
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.toggleTask(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(true);

    act(() => {
      result.current.toggleTask(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(false);
  });

  it('deletes a task', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask('Task to delete', '', 'high');
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it('updates a task', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask('Original title', 'Original desc', 'low');
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.updateTask(taskId, 'Updated title', 'Updated desc', 'high');
    });

    expect(result.current.tasks[0].title).toBe('Updated title');
    expect(result.current.tasks[0].priority).toBe('high');
  });

  it('adds multiple tasks and orders newest first', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask('First task', '', 'low');
      result.current.addTask('Second task', '', 'medium');
      result.current.addTask('Third task', '', 'high');
    });

    expect(result.current.tasks).toHaveLength(3);
    expect(result.current.tasks[0].title).toBe('Third task');
  });
});
