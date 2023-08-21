import moment from 'moment-timezone'
import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'

export const schemduleDateState = selector({
  key: 'ScheduleDateState',
  get: ({ get }) => {
    const { date } = get(SchemduleState)

    if (date !== null) {
      const parseDate = moment({
        year: date.year,
        month: date.month - 1,
        day: date.day,
      })

      return parseDate.toDate()
    }

    const currentDate = moment().tz(process.env.TIMEZONE || 'Asia/Seoul')

    return currentDate.toDate()
  },
  set: ({ set }, newDate) => {
    if (newDate instanceof Date) {
      const momentDate = moment(newDate)
      const year = momentDate.year()
      const month = momentDate.month() + 1
      const day = momentDate.date()

      set(SchemduleState, (preState) => {
        return {
          ...preState,
          date: {
            ...preState.date,
            ...{
              year,
              month,
              day,
            },
          },
        }
      })
    }
  },
})
