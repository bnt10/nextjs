import moment from 'moment-timezone'

import type { DateData, TimeData } from '@/types/schedule'
import type { TargetDay } from '@/types/todoList'

export const toClientDate = (serverDate: Date) => {
  const localDateTime = moment(serverDate)
    .clone()
    .tz(process.env.TIMEZONE || 'Asia/Seoul')

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

export const toServerDate = (ClientDate: TargetDay) => {
  const { date, time } = ClientDate
  const { hour, minute, amPm } = time
  const { year, month, day } = date

  const formattedTime = `${hour}:${minute} ${amPm}`
  const formattedDate = `${year}-${month}-${day}`

  const dateTimeString = `${formattedDate} ${formattedTime}`

  const serverDate = moment
    .tz(
      dateTimeString,
      'YYYY-MM-DD hh:mm A',
      process.env.TIMEZONE || 'Asia/Seoul'
    )
    .utc()

  return serverDate.toDate()
}
