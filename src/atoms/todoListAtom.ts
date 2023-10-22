import { atom } from 'recoil'

import type { TodoItem } from '@/types/todoList'

export const TodoListState = atom<TodoItem[]>({
  key: 'TodoListStateKey',
  default: [],
})
