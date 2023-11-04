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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Set } from 'typescript'

import { TodoListState } from '@/atoms/todoListAtom'
import Button from '@/component/common/Button'
import { LEFT_ARROW, RIGHT_ARROW } from '@/config/icon'
import useEffectAfterMount from '@/hooks/useEffectAfterMount'
import { apiStateSelector } from '@/selectors/apiSelector'
import { schemduleDateState } from '@/selectors/dateSelector'
import type { ButtonStyle } from '@/types/style/common'
import type { InitialDataType, TodoItemClient } from '@/types/todoList'
import { toServerDate } from '@/utils/mapper'

import { calendarConfig } from '../../../config/calendar'
import { throttle } from '../../../utils/timing'

const {
  VISIBLE_DAY_COUNT,
  PRELOAD_DAY_COUNT,
  DAYS_FETCH_START,
  SIDE_DAY_COUNT,
  DAY_WIDTH,
  DAY_HEIGHT,
  START_DAYS_OFFSET_X,
  NEXT_DAY,
  PRIOUS_DAY,
  ADD_DATE,
} = calendarConfig

type DayItem = {
  day: string
  weekDay: string
  key: string
}

const isDateInTodoSet = (
  targetDay: string,
  todoDateSet: Set<string>
): boolean => {
  return todoDateSet.has(targetDay)
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
    ]?.key === currentDay.toDate().toString()
  )
}
const hasTodoItemsOnDate = (todoList: TodoItemClient[]) => {
  const idSet = new Set(
    todoList?.map((item) => toServerDate(item.targetDay).toString())
  )
  return idSet
}

function generateDayObject(currentDay: moment.Moment): DayItem {
  return {
    day: currentDay.format('D'),
    weekDay: currentDay.format('ddd'),
    key: currentDay.toDate().toString(),
  }
}

function getSelectedDay(
  selectedDay: moment.Moment,
  currentDay: string | undefined
) {
  return selectedDay.toDate().toString() === currentDay ? '#8687E7' : '#363636'
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

function CustomCalendar({ initialData }: InitialDataType) {
  const [schemduleDate, setSchemduleDate] = useRecoilState(schemduleDateState)

  const [date, setDate] = useState(() => moment(schemduleDate))
  const setApiState = useSetRecoilState(apiStateSelector)
  const todoList = useRecoilValue(TodoListState)
  const [todoDateSet, setTodoDateSet] = useState(() =>
    hasTodoItemsOnDate(initialData)
  )
  const [visibleDays, setVisibleDays] = useState(() => {
    return Array.from({ length: SIDE_DAY_COUNT * 2 + 1 }, (_, i) => {
      const currentDay = date
        .clone()
        .subtract(SIDE_DAY_COUNT + PRELOAD_DAY_COUNT, 'days')
        .add(i, 'days')

      return generateDayObject(currentDay)
    })
  })

  const dateRef = useRef(schemduleDate)
  const target = useRef(null)
  const isNeedsMoreData = useRef(false)
  const containerX = useRef(
    -(VISIBLE_DAY_COUNT * DAY_WIDTH) - START_DAYS_OFFSET_X
  )
  const eventDirection = useRef<number>(0)
  const containerSpringRef = useSpringRef()
  const daysSpringRef = useSpringRef()

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
      console.count('moreDate')
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

      setApiState((prevState) => ({ ...prevState, needDate: true }))
      isNeedsMoreData.current = false
    }
  }, [visibleDays.length])

  useEffect(() => {
    // false에서 true변경함 확인 필요
    if (isNeedsMoreData.current) {
      setTodoDateSet(hasTodoItemsOnDate(todoList))
    }
  }, [todoList])

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
    containerX.current += DAY_WIDTH * direction

    isNeedsMoreData.current = needsMoreData(
      visibleDays,
      dateRef.current,
      direction
    )

    if (isNeedsMoreData.current) {
      addDate(direction)
      return
    }

    setContainerSpring({ x: containerX.current })
    startDaysAnimataion()
  }, [visibleDays.length])

  const updateDays = () => {
    runSprings()
    checkUpdateMonthAndYear()
    setSchemduleDate(dateRef.current)
  }
  const timeRef = useRef(schemduleDate)

  useEffectAfterMount(() => {
    console.log(timeRef.current.valueOf() === schemduleDate.valueOf())
    if (todoDateSet && timeRef.current.toDate() === schemduleDate.toDate()) {
      isDateInTodoSet(schemduleDate.toDate().toString(), todoDateSet)
      const getDiffdays = (
        currentDay: moment.Moment,
        targetDay: moment.Moment
      ) => {
        return currentDay.diff(targetDay, 'days')
      }
      const move = getDiffdays(dateRef.current, schemduleDate)

      eventDirection.current = move
      dateRef.current = schemduleDate
      runSprings()
      checkUpdateMonthAndYear()
      console.log('useEffect가 실행됩니다. 값:')
    }
  }, [schemduleDate.valueOf()])

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

  return (
    <>
      <div className="flex w-full shrink-0 justify-between bg-footer-gray">
        <Button
          style={CalendarButtonStyle}
          dataType={PRIOUS_DAY}
          handler={moveDays}
          icon={LEFT_ARROW}
        />
        <button className="flex flex-col items-center">
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
                {todoDateSet.has(key) && (
                  <div className="h-4pxr w-4pxr rounded-full bg-primary" />
                )}
              </a.div>
            </a.div>
          ))}
        </a.div>
      </div>
    </>
  )
}

export default CustomCalendar
