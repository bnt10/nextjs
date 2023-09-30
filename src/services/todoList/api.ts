import moment from 'moment-timezone'

import type { TodoItem } from '@/types/todoList'
import axiosInstance from '@/utils/axios'
import { convertFromUTC } from '@/utils/convert'

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
  date: string | null
): Promise<TodoItem[]> => {
  const url = date ? `/api/todo?date=${date}` : '/api/todo'

  const { data } = await axiosInstance.get(url)

  if (!data) {
    throw new Error('No data available')
  }

  const todoList = data.map(
    (item: ResponseTodoList): TodoItem => ({
      id: item.id,
      userId: item.userId,
      title: item.title,
      description: item.description,
      categoryId: item.categoryId,
      priority: item.priority,
      isCompleted: item.isCompleted,
      targetDay: convertFromUTC(moment(item.targetDay)),
    })
  )

  return todoList
}
