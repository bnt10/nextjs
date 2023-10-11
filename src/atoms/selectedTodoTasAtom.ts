import { atom } from 'recoil'

import type { TodoItem } from '@/types/todoList'

type SelectedTodoTaskStateType = TodoItem | null

export const selectedTodoTaskState = atom<SelectedTodoTaskStateType>({
  key: 'SelectedTodoTaskState',
  default: null,
})
