import { atom } from 'recoil'

import type { SchemduleStateType } from '@/types/schedule'

export const SchemduleState = atom<SchemduleStateType>({
  key: 'SchemduleStateKey',
  default: {
    time: { hour: '00', minute: '00', amPm: 'AM' },
    date: null,
    priority: 1,
    category: null,
    timeZone: process.env.TIMEZONE || 'Asia/Seoul',
  },
})
