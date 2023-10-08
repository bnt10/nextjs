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

export const TaskType = {
  Timer: 'Timer',
  Category: 'Category',
  Priority: 'Priority',
  Delete: 'Delete',
} as const

export type TaskTypeKeys = (typeof TaskType)[keyof typeof TaskType]

export type TaskTypeToTodoItemKeyMapping = {
  [key in TaskTypeKeys]?: string
}
