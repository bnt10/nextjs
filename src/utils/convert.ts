import moment from 'moment-timezone'

import type { DateData, TimeData } from '@/types/schedule'

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
  const { hour, minute, amPm } = time
  const { year, month, day } = date

  const calculatedHour =
    amPm?.toUpperCase() === 'PM'
      ? parseInt(hour ?? '0', 10) + 12
      : parseInt(hour ?? '0', 10)
  const calculatedMinute = parseInt(minute ?? '0', 10)
  const dateTimeString = `${year}-${month}-${day} ${calculatedHour}:${calculatedMinute}`

  const utcDateTime = moment
    .tz(
      dateTimeString,
      'YYYY-MM-DD hh:mm',
      process.env.TIMEZONE || 'Asia/Seoul'
    )
    .utc()

  return utcDateTime
}
