import moment from 'moment-timezone'
import { atom } from 'recoil'

import type { ScheduleStateType } from '@/types/schedule'
import { convertDateToObject } from '@/utils/date'

import { timezone } from './scheduleAtom'

export const tempScheduleState = atom<ScheduleStateType>({
  key: 'TempScheduleStateKey',
  default: {
    time: { hour: '12', minute: '00', amPm: 'AM' },
    date: convertDateToObject(moment().tz(timezone).toDate()),
    priority: 1,
    category: '1',
    timeZone: timezone,
  },
})
