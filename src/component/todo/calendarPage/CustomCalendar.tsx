import { a, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import moment from 'moment'
import React, { useCallback, useRef, useState } from 'react'

import { throttle } from '@/utils/timing'

// const VISIBLE_DAY_COUNT = 7
const PRELOAD_DAY_COUNT = 0
const SIDE_DAY_COUNT = 10
const DAY_WIDTH = 29
const DAY_HEIGHT = 42

function generateDayObject(currentDay: moment.Moment) {
  return {
    day: currentDay.format('D'),
    weekDay: currentDay.format('ddd'),
    key: `${currentDay.format('YYYY-MM-DD')}-${currentDay.format('ddd')}`,
  }
}

export default function CustomCalendar() {
  const [date] = useState(() => moment())

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
    // x:
    //   -(PRELOAD_DAY_COUNT + SIDE_DAY_COUNT + VISIBLE_DAY_COUNT + 1) * DAY_WIDTH,
    x: 0,
  }))

  const runSprings = useCallback((_: number) => {}, [visibleDays, date])

  const target = useRef(null)
  useGesture(
    {
      onWheel: throttle(({ event, offset: [, _], direction: [, dy] }) => {
        event.preventDefault()
        runSprings(dy)
      }, 1000),
      onClick: () => {
        setContainerSpring(() => {
          return {
            x: containerSpring.x.get() + DAY_WIDTH,
          }
        })
        runSprings(-1)
      },
    },
    {
      target,
      wheel: { eventOptions: { passive: false } },
    }
  )

  return (
    <>
      <div className="flex w-full max-w-[375px]  overflow-hidden">
        <a.div
          ref={target}
          className="relative flex justify-center bg-red-100"
          style={containerSpring}
        >
          {visibleDays.map(({ day, weekDay, key }) => (
            <a.div
              className="mr-15pxr rounded bg-gray-200 px-5pxr py-3pxr text-white"
              key={key}
            >
              <div
                className="flex flex-col items-center justify-center"
                style={{ width: DAY_WIDTH, height: DAY_HEIGHT }}
              >
                <p className="text-xs">{weekDay}</p>
                <p className="text-xs">{day}</p>
              </div>
            </a.div>
          ))}
        </a.div>
      </div>
      <button ref={target}>test Button</button>
    </>
  )
}
