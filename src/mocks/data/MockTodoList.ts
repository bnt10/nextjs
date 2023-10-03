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
    userId: '1',
    id: '2',
    title: 'Do Math Homewor!!!k',
    description: 'Todo List !!',
    categoryId: '3',
    priority: '4',
    isCompleted: false,
    targetDay: currentDate(),
  },
  {
    userId: '1',
    id: '3',
    title: 'Do Math Homewor!!!k',
    description: 'Todo List !!',
    categoryId: '3',
    priority: '4',
    isCompleted: false,
    targetDay: currentDate(),
  },
  {
    userId: '1',
    id: '4',
    title: 'Do Math Homewor!!!k',
    description: 'Todo List !!',
    categoryId: '3',
    priority: '4',
    isCompleted: false,
    targetDay: currentDate(),
  },
  {
    userId: '1',
    id: '5',
    title: 'Do Math Homework',
    description: 'Todo List !!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-08-25 01:40 PM'),
  },
  {
    userId: '1',
    id: '6',
    title: 'Do Math Homework',
    description: 'Todo List 2023-09-27  !!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-09-27 01:40 PM'),
  },
  {
    userId: '1',
    id: '7',
    title: 'Do Math Homework',
    description: 'Todo List  2023-09-28!!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-09-28 01:40 PM'),
  },
  {
    userId: '1',
    id: '9',
    title: 'Do Math Homework',
    description: 'Todo List  2023-10-03!!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-10-03 01:40 PM'),
  },
  {
    userId: '1',
    id: '10',
    title: 'Do Math Homework',
    description: 'Todo List  2023-10-02!!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-10-02 01:40 PM'),
  },
  {
    userId: '1',
    id: '11',
    title: 'Do Math Homework',
    description: 'Todo List  2023-10-04!!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-10-01 01:40 PM'),
  },
  {
    userId: '1',
    id: '12',
    title: 'Do Math Homework',
    description: 'Todo List  2023-10-20!!',
    categoryId: '2',
    priority: '1',
    isCompleted: false,
    targetDay: newDate('2023-10-20 01:40 PM'),
  },
]
