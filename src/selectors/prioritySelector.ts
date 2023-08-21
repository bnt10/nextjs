import { DefaultValue, selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'

export const schedulePriorityState = selector({
  key: 'ScheduletPriorityState',
  get: ({ get }) => {
    const { priority } = get(SchemduleState)

    return priority
  },
  set: ({ set }, newPriority) => {
    set(SchemduleState, (preState) => {
      return {
        ...preState,
        priority:
          newPriority instanceof DefaultValue ? preState.priority : newPriority,
      }
    })
  },
})
