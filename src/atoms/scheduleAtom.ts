import moment from 'moment'
import { atom } from 'recoil'

import type { SchemduleStateType } from '@/types/schedule'
import { convertDateToObject } from '@/utils/date'

export const timezone = process.env.TIMEZONE || 'Asia/Seoul'
export const SchemduleState = atom<SchemduleStateType>({
  key: 'SchemduleStateKey',
  default: {
    time: { hour: '00', minute: '00', amPm: 'AM' },
    date: convertDateToObject(moment().tz(timezone).toDate()),
    priority: 1,
    category: '1',
    timeZone: timezone,
  },
})
