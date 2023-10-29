import { atom } from 'recoil'

import type { TodoItemClient } from '@/types/todoList'

export const TodoListState = atom<TodoItemClient[]>({
  key: 'TodoListStateKey',
  default: [],
})
