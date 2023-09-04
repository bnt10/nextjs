import moment from 'moment'
import { useEffect, useState } from 'react'

// const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const VISIBLE_DAY_COUNT = 7
const SIDE_DAY_COUNT = 3
export default function CustomCalendar() {
  const [date, setdate] = useState<moment.Moment>(() => moment())

  const returnToday = () => setdate(moment())
  const visibleDays = Array.from({ length: VISIBLE_DAY_COUNT }, (_, i) => {
    const currentDay = date
      .clone()
      .subtract(1, 'days')
      .subtract(SIDE_DAY_COUNT, 'days')
      .add(i, 'days')

    return {
      day: currentDay.format('D'), // '4'
      weekDay: currentDay.format('ddd'), // 'Mon'
      key: `${currentDay.format('YYYY-MM-DD')}-${currentDay.format('ddd')}`,
    }
  })
  useEffect(() => {
    returnToday()
  }, [])

  return (
    <>
      <div>
        {visibleDays.map(({ day, weekDay, key }) => {
          return (
            <div key={key}>
              <span>{day}</span> <span>{weekDay}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
