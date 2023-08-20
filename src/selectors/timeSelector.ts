import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'

export const scheduleTimeState = selector({
  key: 'ScheduletTmeState',
  get: ({ get }) => {
    const schemduleState = get(SchemduleState)
    console.log(schemduleState)
    return schemduleState.time
  },
  set: ({ set }, newTime) => {
    set(SchemduleState, (preState) => {
      return {
        ...preState,
        time: {
          ...preState.time,
          ...newTime,
        },
      }
    })
  },
})
