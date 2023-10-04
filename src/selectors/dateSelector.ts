import moment from 'moment-timezone'
import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'

export const schemduleDateState = selector({
  key: 'ScheduleDateStateSelector',
  get: ({ get }) => {
    const { date, timeZone } = get(SchemduleState)

    if (!date) {
      const currentDate = moment().tz(timeZone)
      return currentDate.toDate()
    }

    const parseDate = moment({
      year: date.year,
      month: date.month - 1,
      day: date.day,
    })

    return parseDate.toDate()
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
