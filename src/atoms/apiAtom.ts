import { atom } from 'recoil'

import type { ApiStateType } from '@/types/apiState'

export const ApiState = atom<ApiStateType>({
  key: 'ApiState',
  default: {
    isLoading: false,
    needDate: false,
  },
})
