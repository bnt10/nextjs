import moment from 'moment-timezone'

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
