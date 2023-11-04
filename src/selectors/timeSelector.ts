import moment from 'moment'
import { selector } from 'recoil'

import { tempScheduleState } from '@/atoms/tempscheduleAtom'
import type { DateData, DateWidthTimeType } from '@/types/schedule'
import { currentDate } from '@/utils/convert'
import { convertDateToObject, convertObjectToDate } from '@/utils/date'

export const scheduleDateDataState = selector({
  key: 'ScheduleDateDataState',
  get: ({ get }) => {
    const { date, time } = get(tempScheduleState)
    const convertDate = date
      ? convertObjectToDate(date as DateData)
      : moment(currentDate()).toDate()
    return { date: convertDate, time }
  },
  set: ({ set }, newState) => {
    const { date, time } = newState as DateWidthTimeType
    if (date && time) {
      set(tempScheduleState, (preState) => {
        return {
          ...preState,
          time,
          date: convertDateToObject(date as Date),
        }
      })
    }
  },
})
