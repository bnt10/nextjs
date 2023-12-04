import { DefaultValue, selector } from 'recoil'

import { tempScheduleState } from '@/atoms/tempscheduleAtom'

export const schedulePriorityState = selector({
  key: 'SchedulePriorityState',
  get: ({ get }) => {
    const { priority } = get(tempScheduleState)

    return priority
  },
  set: ({ set }, newPriority) => {
    set(tempScheduleState, (preState) => {
      return {
        ...preState,
        priority:
          newPriority instanceof DefaultValue ? preState.priority : newPriority,
      }
    })
  },
})
