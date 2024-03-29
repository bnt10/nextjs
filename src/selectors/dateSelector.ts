import moment from 'moment-timezone'
import { selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'
import { toServerDate } from '@/utils/mapper'

export const schemduleDateState = selector({
  key: 'ScheduleDateStateSelector',
  get: ({ get }) => {
    const { date, time } = get(SchemduleState)
    const serverDate = toServerDate({ date, time })

    return moment(serverDate)
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
