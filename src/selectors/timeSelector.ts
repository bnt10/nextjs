import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'
import type { TargetDay } from '@/types/todoList'

export const scheduleDateDataState = selector({
  key: 'ScheduleDateDataState',
  get: ({ get }) => {
    const { date, time } = get(SchemduleState)
    return { date, time }
  },
  set: ({ set }, newDateData) => {
    const { date, time } = newDateData as TargetDay

    if (date && time) {
      set(SchemduleState, (preState) => {
        return {
          ...preState,
          time,
          date,
        }
      })
    }
  },
})
