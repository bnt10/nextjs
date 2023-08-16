import { a, useSprings } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { useCallback, useEffect, useRef } from 'react'

import { throttle } from '@/utils/timing'

type TimeType = 'H' | 'M' | 'AmPm'
interface Props {
  timeType: TimeType
  value?: string
}
const timeItems = {
  H: Array.from({ length: 12 }, (_, index) =>
    index.toString().padStart(2, '0')
  ),
  M: Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, '0')
  ),

  AmPm: ['AM', 'PM'],
}

const TIME_VISIABLE_INDEX = 3
const AM_PM_VISIABLE_INDEX = 2
const ITEM_HEIGHT = 22
const ACTIVE_ITEM_FONT_SIZE = '24px'
const ITEM_FONT_SIZE = '16px'
const ACTIVE_ITEM_OPACITY = '0.75'
const ITEM_OPACITY = '0.1'

export default function TimeRoller({ timeType, value }: Props) {
  const rollerItems = timeItems[timeType]

  const firstVisibleItemIndex = useRef(
    (value ? rollerItems.indexOf(value) : 0) - 1
  )
  const visiableCount =
    timeType === 'AmPm' ? AM_PM_VISIABLE_INDEX : TIME_VISIABLE_INDEX
  const rollerLength = rollerItems.length

  const circularIndex = useCallback(
    (verticalIndex: number, totalItems = rollerLength) =>
      (verticalIndex < 0 ? verticalIndex + totalItems : verticalIndex) %
      totalItems,
    [rollerItems]
  )

  const getPosition = useCallback(
    (
      currentItemIndex: number,
      firstVisableItem: number,
      itemTotalLength: number
    ) => {
      const actualPosition =
        firstVisableItem === 0
          ? currentItemIndex
          : (itemTotalLength - firstVisableItem + currentItemIndex) %
            itemTotalLength
      return actualPosition
    },
    []
  )
  const springHeight = (rollerIndex: number) => {
    return {
      AmPm: {
        y: ITEM_HEIGHT * rollerIndex,
        updateY: ITEM_HEIGHT,
      },
      H: {
        y:
          rollerIndex < rollerLength - 1
            ? ITEM_HEIGHT * rollerIndex
            : -ITEM_HEIGHT,
        updateY: -ITEM_HEIGHT,
      },
      M: {
        y:
          rollerIndex < rollerLength - 1
            ? ITEM_HEIGHT * rollerIndex
            : -ITEM_HEIGHT,
        updateY: -ITEM_HEIGHT,
      },
    }
  }
  const [springs, api] = useSprings(rollerLength, (rollerIndex: number) => {
    return {
      y: springHeight(rollerIndex)[timeType].y,
      fontSize:
        rollerIndex === firstVisibleItemIndex.current
          ? ACTIVE_ITEM_FONT_SIZE
          : ITEM_FONT_SIZE,
      opacity:
        rollerIndex === firstVisibleItemIndex.current
          ? ACTIVE_ITEM_OPACITY
          : ITEM_OPACITY,
      config: {
        tension: 200,
        friction: 20,
      },
    }
  })

  const target = useRef<HTMLDivElement | null>(null)

  const runSprings = useCallback(
    (firstVisableItem: number, dy: number) => {
      api.start((i) => {
        const position = getPosition(i, firstVisableItem, rollerLength)
        const scrollingTargetIndex = circularIndex(
          firstVisableItem - 1,
          rollerLength
        )
        const scrollUp = position > visiableCount
        const scrollDown =
          i === scrollingTargetIndex ? false : position > visiableCount

        const visiableCenterIndex = (firstVisableItem + 1) % rollerLength

        return {
          y:
            i === scrollingTargetIndex
              ? springHeight(position)[timeType].updateY
              : ITEM_HEIGHT * position,
          fontSize:
            i === visiableCenterIndex ? ACTIVE_ITEM_FONT_SIZE : ITEM_FONT_SIZE,
          opacity:
            i === visiableCenterIndex ? ACTIVE_ITEM_OPACITY : ITEM_OPACITY,
          immediate: dy < 0 ? scrollUp : scrollDown,
        }
      })
    },
    [getPosition, api]
  )

  useEffect(() => {
    runSprings(firstVisibleItemIndex.current, 1)
  }, [])

  const wheelOffset = useRef(0)

  useGesture(
    {
      onWheel: throttle(({ event, offset: [, y], direction: [, dy] }) => {
        event.preventDefault()

        if (dy && wheelOffset.current !== y) {
          wheelOffset.current = y

          firstVisibleItemIndex.current += dy > 0 ? 1 : -1
          firstVisibleItemIndex.current =
            (firstVisibleItemIndex.current + rollerLength) % rollerLength

          runSprings(firstVisibleItemIndex.current, dy)
        }
      }, 200),
      onClick: ({ event }) => {
        event.preventDefault()

        firstVisibleItemIndex.current += +1
        firstVisibleItemIndex.current =
          (firstVisibleItemIndex.current + rollerLength) % rollerLength

        runSprings(firstVisibleItemIndex.current, 1)
      },
    },
    { target, wheel: { eventOptions: { passive: false } } }
  )
  return (
    <div
      ref={target}
      className="relative flex h-64pxr w-64pxr  justify-center overflow-hidden bg-[#272727]"
    >
      {springs.map(({ y, fontSize, opacity }, i) => {
        return (
          <a.div
            key={i}
            className="absolute flex items-center justify-center will-change-transform"
            style={{ y, height: `${ITEM_HEIGHT}px`, width: '22px' }}
          >
            <a.div
              style={{
                textAlign: 'center',
                color: 'white',
                opacity,
                fontSize,
              }}
            >
              {rollerItems[i]}
            </a.div>
          </a.div>
        )
      })}
    </div>
  )
}
