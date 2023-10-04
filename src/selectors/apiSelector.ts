import { selector } from 'recoil'

import { ApiState } from '@/atoms/apiAtom'

export const apiStateSelector = selector({
  key: 'apiStateSelector',
  get: ({ get }) => {
    return get(ApiState)
  },
  set: ({ set }, newState) => {
    set(ApiState, (prevState) => {
      return {
        ...prevState,
        ...newState,
      }
    })
  },
})
