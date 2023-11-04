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
export const toShortDate = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD')
}
export const toRelatvieDay = (date: Date): string => {
  const targetDate = moment(date)
  const now = moment().format('YYYY-MM-DD')

  return targetDate.calendar(now, {
    sameDay: '[Today At] h:mm A',
    nextDay: '[Tomorrow At] h:mm A',
    nextWeek: 'dddd [At] h:mm A',
    lastDay: '[Yesterday At] h:mm A',
    lastWeek: '[Last] dddd [At] h:mm A',
    sameElse: 'YYYY-MM-DD [At] h:mm A',
  })
}
