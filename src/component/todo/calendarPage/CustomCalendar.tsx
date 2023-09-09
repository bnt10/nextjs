import { a, useSprings } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '@/utils/timing'

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
  const [springValues, api] = useSprings(visibleDays.length, (i) => {
    return {
      x: i * 30,
    }
  })
  const runSprings = useCallback(() => {
    api.start((i) => {
      return {
        x: i * 60,
      }
    })
  }, [api])

  const target = useRef<HTMLDivElement | null>(null)
  useGesture(
    {
      onWheel: throttle(({ event, offset: [, y], direction: [, dy] }) => {
        event.preventDefault()

        runSprings()
      }, 100),
    },

    { target, wheel: { eventOptions: { passive: false } } }
  )
  return (
    <>
      <div ref={target} className="flex">
        {visibleDays.map(({ day, weekDay, key }, i) => {
          return (
            <a.div style={{ x: springValues[i]?.x }} key={key}>
              <span>{day}</span> <span>{weekDay}</span>
            </a.div>
          )
        })}
      </div>
    </>
  )
}
