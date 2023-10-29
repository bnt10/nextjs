import { atom } from 'recoil'

import type { TodoItemClient } from '@/types/todoList'

type SelectedTodoTaskStateType = TodoItemClient | null

export const selectedTodoTaskState = atom<SelectedTodoTaskStateType>({
  key: 'SelectedTodoTaskState',
  default: null,
})
