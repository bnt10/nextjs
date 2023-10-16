import axios from 'axios'
import moment from 'moment-timezone'

import type { TodoItem } from '@/types/todoList'
import axiosInstance from '@/utils/axios'
import { convertFromUTC } from '@/utils/convert'
import { buildUrlWithParams, buildUrlWithPathParams } from '@/utils/url'

type ResponseTodoList = {
  id: string
  userId: string
  title: string
  description: string
  categoryId: string
  priority: string
  isCompleted: boolean
  targetDay: Date
}
export const fetchTodoList = async (
  startDate?: string,
  endDate?: string
): Promise<TodoItem[]> => {
  const url = buildUrlWithParams('/api/todo', { startDate, endDate })
  const { data } = await axiosInstance.get(url)

  if (!data) {
    throw new Error('No data available')
  }

  const todoList = data.map(
    (item: ResponseTodoList): TodoItem => ({
      id: item.id,
      userId: item.userId,
      title: item.title,
      todoTitle: item.title,
      description: item.description,
      categoryId: item.categoryId,
      priority: item.priority,
      isCompleted: item.isCompleted,
      targetDay: convertFromUTC(moment(item.targetDay)),
    })
  )

  return todoList
}
export const getTodoTask = async (taskId: string): Promise<TodoItem> => {
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
    targetDay: convertFromUTC(moment(data.targetDay)),
  }
  return todoList as TodoItem
}

export const getTaskFromEtcd = async () => {
  try {
    const response = await axios.get('/api/getToEtcd')
    if (response.status === 200) {
      const { task } = response.data
      console.log('Task from etcd:', task)
      return task
    }
  } catch (error) {
    console.error('Failed to get task from etcd:', error)
  }
  return null
}
