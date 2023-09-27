import {
  a,
  useChain,
  useSpring,
  useSpringRef,
  useSprings,
} from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import moment from 'moment'
import type { SyntheticEvent } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import type { ButtonStyle } from '@/component/common/Button'
import Button from '@/component/common/Button'
import { LEFT_ARROW, RIGHT_ARROW } from '@/config/icon'
import { schemduleDateState } from '@/selectors/dateSelector'

import { throttle } from '../../../utils/timing'
import EmptyTodoList from '../home/EmptyTodoList'
import TodoList from '../home/TodoList'
import TaskControlPanel from '../taskEditor/TaskControlPanel'

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

const CalendarButtonStyle: ButtonStyle = {
  button: 'px-24pxr py-12pxr ',
  icon: 'w-16pxr h-16pxr relative',
}

export default function CustomCalendar() {
  const [date, setDate] = useState(() => moment())
  const [, setSchemduleDate] = useRecoilState(schemduleDateState)

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
        containerX.current += DAY_WIDTH * (ADD_DATE + 1) * -direction
        setContainerSpring(() => {
          return {
            x: containerX.current,
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

  const checkUpdateMonthAndYear = () => {
    const checkYear = date.year()
    const checkMonth = date.month() + 1

    const currentYear = dateRef.current.year()
    const currentMonth = dateRef.current.month() + 1

    if (checkYear !== currentYear || checkMonth !== currentMonth) {
      setDate(dateRef.current)
    }
  }

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

  const updateDays = () => {
    runSprings()
    checkUpdateMonthAndYear()
    setSchemduleDate(dateRef.current.toDate())
  }

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
    },
    {
      target,
      eventOptions: { passive: false },
    }
  )

  const moveDays = (e: SyntheticEvent) => {
    const dataType = (e.currentTarget as HTMLButtonElement).getAttribute(
      'data-type'
    ) as string

    eventDirection.current = parseInt(dataType, 10)

    updateDays()
  }
  const isEmptyTodoList = false
  return (
    <>
      <div className="flex w-full shrink-0 justify-between bg-footer-gray">
        <Button
          style={CalendarButtonStyle}
          dataType={PRIOUS_DAY}
          handler={moveDays}
          icon={LEFT_ARROW}
        />
        <button className="flex flex-col ">
          <span className="text-white/[0.87]">{date.format('MMM')}</span>
          <span className="text-xsm text-gray-800">{date.format('YYYY')}</span>
        </button>
        <Button
          dataType={NEXT_DAY}
          style={CalendarButtonStyle}
          handler={moveDays}
          icon={RIGHT_ARROW}
        />
      </div>
      <div className="mb-20pxr flex w-full max-w-mobile shrink-0 overflow-hidden">
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
      <section className="w-full shrink-0 px-24pxr">
        <TaskControlPanel onCheckedHandler={() => {}} />
      </section>
      {isEmptyTodoList ? <EmptyTodoList /> : <TodoList />}
    </>
  )
}
