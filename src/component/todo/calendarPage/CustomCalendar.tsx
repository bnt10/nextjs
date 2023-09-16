import { a, useSpring, useSprings } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import moment from 'moment'
import React, { useCallback, useRef, useState } from 'react'

import { throttle } from '@/utils/timing'

const VISIBLE_DAY_COUNT = 7
const PRELOAD_DAY_COUNT = 0
const SIDE_DAY_COUNT = 10
const DAY_WIDTH = 54
const DAY_HEIGHT = 49
const START_DAYS_OFFSET_X = 1
const NEXT_DAY = -1
// const PREVIOUS_DAY = +1

function generateDayObject(currentDay: moment.Moment) {
  return {
    day: currentDay.format('D'),
    weekDay: currentDay.format('ddd'),
    key: `${currentDay.format('YYYY-MM-DD')}`,
  }
}

function getSelectedDay(selectedDay: moment.Moment, currentDay: string) {
  return selectedDay.format('YYYY-MM-DD') === currentDay ? '#8687E7' : '#4C4C4C'
}

export default function CustomCalendar() {
  const [date] = useState(() => moment())
  const dateRef = useRef(date)
  const [visibleDays] = useState(() => {
    return Array.from({ length: SIDE_DAY_COUNT * 2 + 1 }, (_, i) => {
      const currentDay = date
        .clone()
        .subtract(SIDE_DAY_COUNT + PRELOAD_DAY_COUNT, 'days')
        .add(i, 'days')

      return generateDayObject(currentDay)
    })
  })

  const [containerSpring, setContainerSpring] = useSpring(() => ({
    x: -(VISIBLE_DAY_COUNT * DAY_WIDTH) - START_DAYS_OFFSET_X,
  }))

  const [daysSpring, api] = useSprings(visibleDays.length, (dayIndex) => {
    return {
      backgroundColor: getSelectedDay(
        dateRef.current,
        visibleDays[dayIndex]?.key ?? ''
      ),
    }
  })
  const runSprings = useCallback(
    (dy: number) => {
      setContainerSpring(() => {
        dateRef.current = dateRef.current.clone().add(1, 'days')
        api.start((i) => {
          return {
            backgroundColor: getSelectedDay(
              dateRef.current,
              visibleDays[i]?.key ?? ''
            ),
          }
        })
        return {
          x: containerSpring.x.get() + DAY_WIDTH * dy,
        }
      })
    },
    [visibleDays, date]
  )

  const target = useRef(null)
  useGesture(
    {
      onWheel: throttle(({ event, offset: [, _], direction: [, dy] }) => {
        event.preventDefault()
        runSprings(dy)
      }, 1000),
      onClick: () => {
        runSprings(NEXT_DAY)
      },
    },
    {
      target,
      wheel: { eventOptions: { passive: false } },
    }
  )

  return (
    <>
      <div className="flex w-full max-w-mobile overflow-hidden">
        <a.div
          ref={target}
          className="relative flex justify-center bg-footer-gray"
          style={containerSpring}
        >
          {visibleDays.map(({ day, weekDay, key }, index) => (
            <a.div
              className="box-border flex justify-center px-6pxr pb-3pxr text-white"
              style={{ width: DAY_WIDTH, height: DAY_HEIGHT }}
              key={key}
            >
              <a.div
                className={`flex w-full flex-col items-center  justify-center rounded`}
                style={daysSpring[index]}
              >
                <p className="text-xs">{weekDay}</p>
                <p className="text-xs">{day}</p>
              </a.div>
            </a.div>
          ))}
        </a.div>
      </div>
      <button className="text-white" ref={target}>
        test Button
      </button>
    </>
  )
}
