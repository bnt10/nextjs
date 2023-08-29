import moment from 'moment'

import type { DateData, TimeData, TimeZone } from '@/types/schedule'

export const convertToUTC = (
  time: TimeData,
  date: DateData,
  timeZone: TimeZone
) => {
  const { hour, minute, amPm } = time
  const { year, month, day } = date

  const formattedTime = `${hour}:${minute} ${amPm}`
  const formattedDate = `${year}-${month}-${day}`

  const dateTimeString = `${formattedDate} ${formattedTime}`

  const utcDateTime = moment
    .tz(dateTimeString, 'YYYY-MM-DD hh:mm A', timeZone)
    .utc()

  return utcDateTime
}

export const convertFromUTC = (
  utcDateTime: moment.Moment,
  timeZone?: TimeZone
): { time: TimeData; date: DateData } => {
  const localDateTime = utcDateTime
    .clone()
    .tz(timeZone || process.env.TIMEZONE || 'Asia/Seoul')

  const time: TimeData = {
    hour: localDateTime.format('hh'),
    minute: localDateTime.format('mm'),
    amPm: localDateTime.format('A'),
  }

  const date: DateData = {
    year: localDateTime.year(),
    month: localDateTime.month() + 1,
    day: localDateTime.date(),
  }

  return { time, date }
}

export const newDate = (dateTimeString: string) => {
  const utcDateTime = moment
    .tz(
      dateTimeString,
      'YYYY-MM-DD hh:mm A',
      process.env.TIMEZONE || 'Asia/Seoul'
    )
    .utc()
  return utcDateTime.toDate()
}
export const currentDate = () => {
  const currentTime = moment.tz(process.env.TIMEZONE || 'Asia/Seoul')

  const momentObject = moment(currentTime, 'YYYY-MM-DD hh:mm A')

  return momentObject.toDate()
}
