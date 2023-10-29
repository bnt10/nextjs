import axios from 'axios'

import type {
  CreateTodoItemType,
  TodoItemClient,
  TodoItemServer,
} from '@/types/todoList'
import axiosInstance from '@/utils/axios'
import { toClientDate, toServerDate } from '@/utils/mapper'
import { buildUrlWithParams, buildUrlWithPathParams } from '@/utils/url'

export const fetchTodoList = async (
  startDate?: string,
  endDate?: string
): Promise<TodoItemClient[]> => {
  const url = buildUrlWithParams('/api/todo', { startDate, endDate })
  const { data } = await axiosInstance.get(url)

  if (!data) {
    return []
  }

  const todoList: TodoItemClient[] = data.map(
    (item: TodoItemServer): TodoItemClient => ({
      id: item.id,
      userId: item.userId,
      title: item.title,
      description: item.description,
      categoryId: item.categoryId,
      priority: item.priority,
      isCompleted: item.isCompleted,
      targetDay: toClientDate(item.targetDay),
    })
  )

  return todoList
}
export const getTodoTask = async (taskId: string): Promise<TodoItemClient> => {
  const { url, error } = buildUrlWithPathParams('/api/todo/:id', { id: taskId })

  if (error) {
    throw error
  }

  const { data } = await axiosInstance.get(url)

  if (!data) {
    throw new Error('No data available')
  }

  const todoList = {
    id: data.id,
    userId: data.userId,
    title: data.title,
    description: data.description,
    categoryId: data.categoryId,
    priority: data.priority,
    isCompleted: data.isCompleted,
    targetDay: toClientDate(data.targetDay),
  }
  return todoList as TodoItemClient
}
export const updateTodoTask = async (task: TodoItemClient) => {
  const { url, error } = buildUrlWithPathParams('/api/todo/:id', {
    id: task.id,
  })
  if (error) {
    throw error
  }

  const response = await axiosInstance.patch(url, {
    data: {
      ...task,
      targetDay: toServerDate(task.targetDay),
    },
  })
  if (response.status === 200) {
    return response.data
  }
  return {
    status: 500,
    data: 'Internal Server Error',
  }
}

export const deleteTodoTask = async (taskId: TodoItemClient['id']) => {
  const { url, error } = buildUrlWithPathParams('/api/todo/:id', {
    id: taskId,
  })
  if (error) {
    throw error
  }

  const response = await axiosInstance.delete(url)
  if (response.status === 200) {
    return response.data
  }
  return {
    status: 500,
    data: 'Internal Server Error',
  }
}
export const getTasks = async () => {
  try {
    const response = await axios.get('/api/todo')

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    return error
  }
  return null
}

export const createTodoTask = async (task: CreateTodoItemType) => {
  try {
    const response = await axios.post('/api/todo', {
      task,
    })
    if (response.status === 200) {
      return response
    }
    return {
      status: 500,
      data: 'Internal Server Error',
    }
  } catch (error: any) {
    if (error.response) {
      return error.response
    }
    return {
      status: 500,
      data: 'Internal Server Error',
    }
  }
}
