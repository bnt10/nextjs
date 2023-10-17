import moment from 'moment'
import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'
import type { DateData, DateWidthTimeType } from '@/types/schedule'
import { currentDate } from '@/utils/convert'
import { convertObjectToDate } from '@/utils/date'

export const scheduleDateDataState = selector({
  key: 'ScheduleDateDataState',
  get: ({ get }) => {
    const { date, time } = get(SchemduleState)
    const convertDate = date
      ? convertObjectToDate(date as DateData)
      : moment(currentDate()).toDate()
    return { date: convertDate, time }
  },
  set: ({ set }, newState) => {
    const { date, time } = newState as DateWidthTimeType
    if (date && time) {
      set(SchemduleState, (preState) => {
        return {
          ...preState,
          time,
          date,
        }
      })
    }
  },
})
