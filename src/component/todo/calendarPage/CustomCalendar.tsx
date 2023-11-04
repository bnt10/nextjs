import {
  a,
  useChain,
  useSpring,
  useSpringRef,
  useSprings,
} from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import moment from 'moment-timezone'
import type { SyntheticEvent } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Set } from 'typescript'

import { timezone } from '@/atoms/scheduleAtom'
import { TodoListState } from '@/atoms/todoListAtom'
import Button from '@/component/common/Button'
import { LEFT_ARROW, RIGHT_ARROW } from '@/config/icon'
import useEffectAfterMount from '@/hooks/useEffectAfterMount'
import { apiStateSelector } from '@/selectors/apiSelector'
import { schemduleDateState } from '@/selectors/dateSelector'
import type { ButtonStyle } from '@/types/style/common'
import type { InitialDataType, TodoItemClient } from '@/types/todoList'
import { toShortDate } from '@/utils/date'
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
    ]?.key === toShortDate(currentDay.toDate())
  )
}
const hasTodoItemsOnDate = (todoList: TodoItemClient[]) => {
  const idSet = new Set(
    todoList?.map((item) => toShortDate(toServerDate(item.targetDay)))
  )
  return idSet
}
const visiableDaysSet = (DaysList: DayItem[]) => {
  const idSet = new Set(DaysList?.map((item) => item.key))
  return idSet
}

function generateDayObject(currentDay: moment.Moment): DayItem {
  return {
    day: currentDay.format('D'),
    weekDay: currentDay.format('ddd'),
    key: toShortDate(currentDay.toDate()),
  }
}

function getSelectedDay(
  selectedDay: moment.Moment,
  currentDay: string | undefined
) {
  return toShortDate(selectedDay.toDate()) === currentDay
    ? '#8687E7'
    : '#363636'
}
const calculateDay = (startDay: string, i: number, isAppending: boolean) => {
  const day = moment(new Date(startDay)).clone()
  return isAppending
    ? day.add(i + 1, 'days')
    : day.subtract(ADD_DATE - i, 'days')
}

const CalendarButtonStyle: ButtonStyle = {
  button: 'px-24pxr py-12pxr ',
  icon: 'w-16pxr h-16pxr relative',
}
interface Props extends InitialDataType {
  startDay?: moment.Moment
}
function CustomCalendar({
  initialData,
  startDay = moment().tz(timezone),
}: Props) {
  const [schemduleDate, setSchemduleDate] = useRecoilState(schemduleDateState)

  const setApiState = useSetRecoilState(apiStateSelector)
  const todoList = useRecoilValue(TodoListState)
  const [todoDateSet, setTodoDateSet] = useState(() =>
    hasTodoItemsOnDate(initialData)
  )

  const [visibleDays, setVisibleDays] = useState(() => {
    return Array.from({ length: SIDE_DAY_COUNT * 2 + 1 }, (_, i) => {
      const currentDay = startDay
        .clone()
        .subtract(SIDE_DAY_COUNT + PRELOAD_DAY_COUNT, 'days')
        .add(i, 'days') as moment.Moment

      return generateDayObject(currentDay)
    })
  })
  const currentDaysSet = useRef(visiableDaysSet(visibleDays))
  const dateRef = useRef(schemduleDate)
  const target = useRef(null)
  const isNeedsMoreData = useRef(false)
  const containerX = useRef(
    -(VISIBLE_DAY_COUNT * DAY_WIDTH) - START_DAYS_OFFSET_X
  )
  const dayPosition = useRef<number>(0)
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
    const currentStartDay = (
      isAppending
        ? visibleDays[visibleDays.length - 1]?.key
        : visibleDays[0]?.key
    ) as string

    const extraDays = Array.from({ length: ADD_DATE }, (_, i) =>
      generateDayObject(calculateDay(currentStartDay as string, i, isAppending))
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
    const isMoreDatesRequired = isDateInTodoSet(
      toShortDate(schemduleDate.toDate()),
      currentDaysSet.current
    )
    console.log(isMoreDatesRequired)
  }, [])
  useEffect(() => {
    if (isNeedsMoreData.current) {
      const direction = dayPosition.current

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
    const checkYear = schemduleDate.year()
    const checkMonth = schemduleDate.month() + 1

    const currentYear = dateRef.current.year()
    const currentMonth = dateRef.current.month() + 1

    if (checkYear !== currentYear || checkMonth !== currentMonth) {
      setSchemduleDate(dateRef.current)
    }
  }

  const runSprings = useCallback(
    (move: number) => {
      dateRef.current = dateRef.current.clone().add(-move, 'days')
      containerX.current += DAY_WIDTH * move
      isNeedsMoreData.current = needsMoreData(
        visibleDays,
        dateRef.current,
        move
      )

      if (isNeedsMoreData.current) {
        addDate(move)
        return
      }

      setContainerSpring({ x: containerX.current })
      startDaysAnimataion()
    },
    [visibleDays.length]
  )

  const updateDays = () => {
    runSprings(dayPosition.current)
    checkUpdateMonthAndYear()
  }
  const getDiffdays = (currentDay: moment.Moment, targetDay: moment.Moment) => {
    return currentDay.diff(targetDay, 'days')
  }
  useEffectAfterMount(() => {
    const move = getDiffdays(dateRef.current, schemduleDate)

    if (move !== 0) {
      dayPosition.current = move

      updateDays()
    }
  }, [currentDaysSet.current])

  useGesture(
    {
      onDrag: throttle(({ event, offset: [x, __], direction: [dx, _] }) => {
        event.preventDefault()

        if (dx > 0) {
          // 오른쪽으로 드래그
          dayPosition.current += x
          runSprings(dayPosition.current) // 오른쪽으로 드래그할 경우 실행할 함수
        } else if (dx < 0) {
          // 왼쪽으로 드래그
          dayPosition.current -= x
          runSprings(dayPosition.current) // 왼쪽으로 드래그할 경우 실행할 함수
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

    dayPosition.current = parseInt(dataType, 10)

    updateDays()
    setSchemduleDate(dateRef.current)
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
          <span className="text-white/[0.87]">
            {schemduleDate.format('MMM')}
          </span>
          <span className="text-xsm text-gray-800">
            {schemduleDate.format('YYYY')}
          </span>
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
