import moment from 'moment'
import { DefaultValue, selector } from 'recoil'

import { TodoListState } from '@/atoms/todoListAtom'
import type { TodoItemClient } from '@/types/todoList'

import { schemduleDateState } from './dateSelector'

export const todoListStateSelector = selector({
  key: 'TodoListStateSelector',
  get: ({ get }) => {
    const todoList = get(TodoListState)

    return todoList?.filter((targetDay) => {
      const { year, month, day } = targetDay.targetDay.date
      const schemduleDate = get(schemduleDateState)

      const targetDate = moment(schemduleDate).format('YYYY-MM-DD')
      return (
        targetDate ===
        moment({ year, month: month - 1, day }).format('YYYY-MM-DD')
      )
    })
  },
  set: ({ set }, newState) => {
    set(TodoListState, (prevState: TodoItemClient[]) => {
      if (newState instanceof DefaultValue) {
        return newState
      }

      const idSet = new Set(prevState.map((item) => item.id))
      const uniqueNewItems = newState.filter((item) => !idSet.has(item.id))

      return [...prevState, ...uniqueNewItems]
    })
  },
})
