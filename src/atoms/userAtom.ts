import { atom } from 'recoil'

import type { UserStateType } from '@/types/userState'

export const UserState = atom<UserStateType>({
  key: 'UserState',
  default: {
    userId: '',
    name: '',
  },
})
