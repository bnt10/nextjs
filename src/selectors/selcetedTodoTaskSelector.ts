import { selector } from 'recoil'

import { selectedTodoTaskState } from '@/atoms/selectedTodoTaskAtom'
import type { TodoItemClient } from '@/types/todoList'

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
        } as TodoItemClient
      }

      return {
        ...preState,
        ...newState,
      }
    })
  },
})
