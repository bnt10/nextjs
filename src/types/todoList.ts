import type { DateData, TimeData } from './schedule'

export type TargetDay = {
  time: TimeData
  date: DateData
}
export type TodoListType = {
  initialData: TodoItem[]
  isLoading: boolean
}
export type InitialDataType = Pick<TodoListType, 'initialData'>

export type TodoItem = {
  id: string
  userId: string
  title: string
  description: string
  categoryId: string
  priority: string
  isCompleted: boolean
  targetDay: TargetDay
}
