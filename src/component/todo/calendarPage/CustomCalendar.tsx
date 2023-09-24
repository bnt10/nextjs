import {
  a,
  useChain,
  useSpring,
  useSpringRef,
  useSprings,
} from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '@/utils/timing'

const VISIBLE_DAY_COUNT = 7
const PRELOAD_DAY_COUNT = 0
const daysLeft = 3
const SIDE_DAY_COUNT = 10
const DAY_WIDTH = 54
const DAY_HEIGHT = 49
const START_DAYS_OFFSET_X = 1
// const NEXT_DAY = 1
const PRIOUS_DAY = -1
const ADD_DATE = 30
// const PREVIOUS_DAY = +1

type DayItem = {
  day: string
  weekDay: string
  key: string
}

const needsMoreData = (visibleDays: DayItem[], currentDay: moment.Moment) => {
  console.log(visibleDays[daysLeft]?.key, currentDay.format('YYYY-MM-DD'))
  return visibleDays[daysLeft]?.key === currentDay.format('YYYY-MM-DD')
}
function generateDayObject(currentDay: moment.Moment): DayItem {
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
  const target = useRef(null)
  const [loading, setLoading] = useState(false)
  const isNeedsMoreData = useRef(false)

  const containerSpringRef = useSpringRef()
  const daysSpringRef = useSpringRef()

  const [visibleDays, setVisibleDays] = useState(() => {
    return Array.from({ length: SIDE_DAY_COUNT * 2 + 1 }, (_, i) => {
      const currentDay = date
        .clone()
        .subtract(SIDE_DAY_COUNT + PRELOAD_DAY_COUNT, 'days')
        .add(i, 'days')

      return generateDayObject(currentDay)
    })
  })

  const [containerSpring, setContainerSpring] = useSpring(() => ({
    ref: containerSpringRef,
    x: -(VISIBLE_DAY_COUNT * DAY_WIDTH) - START_DAYS_OFFSET_X,
  }))

  const [daysSpring, api] = useSprings(visibleDays.length, (dayIndex) => ({
    ref: daysSpringRef,
    backgroundColor: getSelectedDay(
      dateRef.current,
      visibleDays[dayIndex]?.key ?? ''
    ),
  }))

  const addDate = (_: number) => {
    if (isNeedsMoreData.current) {
      setLoading(true)
      const extraDays = Array.from({ length: ADD_DATE }, (__, i) => {
        return generateDayObject(
          moment(visibleDays[0]?.key).subtract(ADD_DATE - i, 'days')
        )
      })

      setVisibleDays((prev) => [...extraDays, ...prev])
    }
  }
  const startDaysAnimataion = () => {
    console.log('asdas')
    api.start((i) => {
      return {
        backgroundColor: getSelectedDay(
          dateRef.current,
          visibleDays[i]?.key ?? ''
        ),
      }
    })
  }
  const startScrollAnimation = (dy: number) => {
    setContainerSpring(() => {
      return {
        x: containerSpring.x.get() + DAY_WIDTH * dy,
      }
    })
  }
  useEffect(() => {
    if (isNeedsMoreData.current) {
      setLoading(false)
      setContainerSpring(() => {
        return {
          x: containerSpring.x.get() + DAY_WIDTH * (ADD_DATE - 1) * -1,
          immediate: true,

          onReset: () => {
            startScrollAnimation(1)
            startDaysAnimataion()
          },
        }
      })

      startDaysAnimataion()
      // api.start((i) => ({
      //   backgroundColor: getSelectedDay(
      //     dateRef.current,
      //     visibleDays[i]?.key ?? ''
      //   ),
      // }))
      isNeedsMoreData.current = false
    }
  }, [visibleDays])

  useChain([containerSpringRef, daysSpringRef])
  const runSprings = useCallback(
    async (dy) => {
      if (isNeedsMoreData.current) {
        addDate(PRIOUS_DAY)
      } else {
        setContainerSpring({
          x: containerSpring.x.get() + DAY_WIDTH * dy,
        })

        api.start((i) => ({
          backgroundColor: getSelectedDay(
            dateRef.current,
            visibleDays[i]?.key ?? ''
          ),
        }))
      }
    },
    [visibleDays, date]
  )
  useGesture(
    {
      onWheel: throttle(({ event, offset: [, _], direction: [, dy] }) => {
        console.log('aa')
      }, 1000),
      onClick: () => {
        dateRef.current = dateRef.current.clone().add(PRIOUS_DAY, 'days')

        isNeedsMoreData.current = needsMoreData(visibleDays, dateRef.current)

        runSprings(-PRIOUS_DAY)
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
