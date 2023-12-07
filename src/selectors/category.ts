import { DefaultValue, selector } from 'recoil'

import { ScheduleState } from '@/atoms/scheduleAtom'

export const scheduleCategoryState = selector({
  key: 'scheduleCategoryState',
  get: ({ get }) => {
    const { category } = get(ScheduleState)

    return category
  },
  set: ({ set }, newCategory) => {
    set(ScheduleState, (preState) => {
      return {
        ...preState,
        category:
          newCategory instanceof DefaultValue ? preState.category : newCategory,
      }
    })
  },
})
