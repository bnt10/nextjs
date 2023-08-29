import { currentDate, newDate } from '@/utils/convert'

type TodoItem = {
  id: string
  userId: string
  title: string
  description: string
  categoryId: string
  priority: string
  isCompleted: boolean
  targetDay: Date
}

export const MockTodoList: TodoItem[] = [
  {
    userId: '1',
    id: '1',
    title: 'Do Math Homework',
    description: 'Todo List !!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-08-25 01:40 PM'),
  },
  {
    userId: '2',
    id: '2',
    title: 'Do Math Homewor!!!k',
    description: 'Todo List !!',
    categoryId: '3',
    priority: '4',
    isCompleted: false,
    targetDay: currentDate(),
  },
]
