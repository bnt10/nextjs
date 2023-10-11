import { selector } from 'recoil'

import { selectedTodoTaskState } from '@/atoms/selectedTodoTasAtom'
import type { TodoItem } from '@/types/todoList'

export const selcetedTodoTaskSelector = selector({
  key: 'selcetedTodoTaskSelector',
  get: ({ get }) => {
    return get(selectedTodoTaskState)
  },
  set: ({ set }, newState) => {
    set(selectedTodoTaskState, (preState) => {
      if (!preState) {
        return {
          ...newState,
        } as TodoItem
      }
      return {
        ...preState,
        ...newState,
      }
    })
  },
})
