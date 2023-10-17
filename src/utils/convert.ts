import moment from 'moment-timezone'

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
export function currentDate() {
  const currentTime = moment.tz(process.env.TIMEZONE || 'Asia/Seoul')

  const momentObject = moment(currentTime, 'YYYY-MM-DD hh:mm A')

  return momentObject.toDate()
}

export function combineDateAndTime(
  date: DateData,
  time: TimeData
): moment.Moment {
  let dateTime = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-MM-DD')

  dateTime = dateTime.set({
    hour:
      time.amPm?.toUpperCase() === 'PM'
        ? parseInt(time.hour ?? '0', 10) + 12
        : parseInt(time.hour ?? '0', 10),
    minute: parseInt(time.minute ?? '0', 10),
  })

  return dateTime
}
