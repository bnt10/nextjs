import moment from 'moment'

import type { DateData } from '@/types/schedule'

export const convertObjectToDate = (dateObject: DateData) => {
  const { year, month, day } = dateObject
  const parseDate = moment({
    year,
    month: month - 1,
    day,
  })

  return parseDate.toDate()
}

export const convertDateToObject = (newDate: Date) => {
  const momentDate = moment(newDate)
  const year = momentDate.year()
  const month = momentDate.month() + 1
  const day = momentDate.date()
  return {
    year,
    month,
    day,
  }
}
