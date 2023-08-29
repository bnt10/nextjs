export type TargetDay = {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  amPm: 'am' | 'pm'
}

export type TodoItem = {
  userId: string
  title: string
  description: string
  categoryId: string
  priority: string
  isCompleted: boolean
  targetDay: TargetDay
}
