import moment from 'moment-timezone'
import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'

export const schemduleDateState = selector({
  key: 'ScheduleDateStateSelector',
  get: ({ get }) => {
    const { date } = get(SchemduleState)

    const parseDate = moment({
      year: date.year,
      month: date.month - 1,
      day: date.day,
    })

    return parseDate
  },
  set: ({ set }, newDate) => {
    if (moment.isMoment(newDate)) {
      const momentDate = newDate as moment.Moment
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
