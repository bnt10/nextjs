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

import { throttle } from '../../../utils/timing'

const VISIBLE_DAY_COUNT = 7
const PRELOAD_DAY_COUNT = 0
const DAYS_FETCH_START = 3
const SIDE_DAY_COUNT = 10
const DAY_WIDTH = 54
const DAY_HEIGHT = 49
const START_DAYS_OFFSET_X = 1
const NEXT_DAY = -1
const PRIOUS_DAY = 1
const ADD_DATE = 30

// const appColor = tailwindColor
type DayItem = {
  day: string
  weekDay: string
  key: string
}

const needsMoreData = (
  visibleDays: DayItem[],
  currentDay: moment.Moment,
  direction: number
) => {
  return (
    visibleDays[
      direction === PRIOUS_DAY
        ? DAYS_FETCH_START
        : visibleDays.length - DAYS_FETCH_START
    ]?.key === currentDay.format('YYYY-MM-DD')
  )
}
function generateDayObject(currentDay: moment.Moment): DayItem {
  return {
    day: currentDay.format('D'),
    weekDay: currentDay.format('ddd'),
    key: `${currentDay.format('YYYY-MM-DD')}`,
  }
}

function getSelectedDay(
  selectedDay: moment.Moment,
  currentDay: string | undefined
) {
  return selectedDay.format('YYYY-MM-DD') === currentDay ? '#8687E7' : '#363636'
}
const calculateDay = (startDay: string, i: number, isAppending: boolean) => {
  const day = moment(startDay).clone()
  return isAppending
    ? day.add(i + 1, 'days')
    : day.subtract(ADD_DATE - i, 'days')
}

export default function CustomCalendar() {
  const [date] = useState(() => moment())
  const dateRef = useRef(date)
  const target = useRef(null)

  const isNeedsMoreData = useRef(false)
  const containerX = useRef(
    -(VISIBLE_DAY_COUNT * DAY_WIDTH) - START_DAYS_OFFSET_X
  )
  const eventDirection = useRef<number>(0)
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

  const [containerSpring, setContainerSpring] = useSpring(() => {
    return {
      ref: containerSpringRef,
      x: containerX.current,
    }
  })

  const [daysSpring, api] = useSprings(visibleDays.length, (dayIndex) => {
    return {
      ref: daysSpringRef,
      immediate: !!isNeedsMoreData.current,
      backgroundColor: isNeedsMoreData.current
        ? '#363636'
        : getSelectedDay(dateRef.current, visibleDays[dayIndex]?.key),
    }
  })

  const addDate = (direction: number) => {
    const isAppending = direction === NEXT_DAY
    const startDay = (
      isAppending
        ? visibleDays[visibleDays.length - 1]?.key
        : visibleDays[0]?.key
    ) as string

    const extraDays = Array.from({ length: ADD_DATE }, (_, i) =>
      generateDayObject(calculateDay(startDay as string, i, isAppending))
    )

    setVisibleDays((prev) =>
      isAppending ? [...prev, ...extraDays] : [...extraDays, ...prev]
    )
  }

  const startDaysAnimataion = () => {
    api.start((i) => {
      return {
        backgroundColor: getSelectedDay(
          dateRef.current,
          visibleDays[i]?.key ?? ''
        ),
      }
    })
  }
  const startScrollAnimation = (direction: number) => {
    containerX.current += DAY_WIDTH * direction
    setContainerSpring(() => {
      return {
        x: containerX.current,
      }
    })
  }
  useEffect(() => {
    if (isNeedsMoreData.current) {
      const direction = eventDirection.current

      if (direction === PRIOUS_DAY) {
        setContainerSpring(() => {
          return {
            x: containerX.current + DAY_WIDTH * (ADD_DATE + 1) * -direction,
            immediate: true,
            onRest: () => {
              startDaysAnimataion()
              startScrollAnimation(direction)
            },
          }
        })
      } else {
        setContainerSpring(() => {
          return {
            x: containerX.current,
          }
        })
        startDaysAnimataion()
      }

      isNeedsMoreData.current = false
    }
  }, [visibleDays])

  useChain([containerSpringRef, daysSpringRef])

  const runSprings = useCallback(() => {
    const direction = eventDirection.current
    dateRef.current = dateRef.current.clone().add(-direction, 'days')
    isNeedsMoreData.current = needsMoreData(
      visibleDays,
      dateRef.current,
      direction
    )

    containerX.current += DAY_WIDTH * direction

    if (isNeedsMoreData.current) {
      addDate(direction)
      return
    }

    setContainerSpring({ x: containerX.current })
    startDaysAnimataion()
  }, [visibleDays, date])
  const wheelOffset = useRef(0)

  useGesture(
    {
      onDrag: throttle(({ event, offset: [x, __], direction: [dx, _] }) => {
        event.preventDefault()

        if (dx > 0) {
          // 오른쪽으로 드래그
          wheelOffset.current = x
          runSprings() // 오른쪽으로 드래그할 경우 실행할 함수
        } else if (dx < 0) {
          // 왼쪽으로 드래그
          wheelOffset.current = x
          runSprings() // 왼쪽으로 드래그할 경우 실행할 함수
        }
      }, 1000),
      onClick: () => {
        eventDirection.current = NEXT_DAY // 오른쪽으로 드래그할 경우 실행할 함수
        runSprings()
      },
    },
    {
      target,
      eventOptions: { passive: false },
    }
  )

  return (
    <>
      <div className="flex w-full max-w-mobile overflow-hidden">
        <a.div
          ref={target}
          className="relative flex justify-center bg-footer-gray"
          style={{ ...containerSpring, touchAction: 'none' }}
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
      {/* <button className="text-white" ref={target}>
        test Button
      </button> */}
    </>
  )
}
