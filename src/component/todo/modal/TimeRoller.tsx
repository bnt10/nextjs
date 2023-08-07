import { a, useSprings } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { useCallback, useRef } from 'react'

type TimeType = 'H' | 'M' | 'AmPm'
interface Props {
  timeType: TimeType
}
const timeItems = {
  H: Array.from({ length: 24 }, (_, index) => index),
  M: Array.from({ length: 60 }, (_, index) => index),
  AmPm: ['AM', 'PM'],
}

const TIME_VISIABLE_INDEX = 3
const AM_PM_VISIABLE_INDEX = 2
const ITEM_HEIGHT = 22

export default function TimeRoller({ timeType }: Props) {
  const rollerItems = timeItems[timeType]
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
      firstVisableIndex: number
    ) => {
      const actualPosition =
        currentItemIndex - firstVisableItem + firstVisableIndex
      return circularIndex(actualPosition)
    },
    [circularIndex]
  )

  const [springs, api] = useSprings(rollerLength, (rollerIndex: number) => {
    if (rollerIndex < visiableCount) {
      return { y: ITEM_HEIGHT * rollerIndex }
    }
    return { y: ITEM_HEIGHT * (rollerIndex + visiableCount - 1) }
  })
  const prev = useRef([0, 1])
  const target = useRef<HTMLDivElement | null>(null)

  const runSprings = useCallback(
    (y: number, dy: number) => {
      const firstVisableItem = circularIndex(
        Math.floor(y / ITEM_HEIGHT) % rollerItems.length
      )

      const firstViableItemIndex = 0
      api.start((i) => {
        const position = getPosition(i, firstVisableItem, firstViableItemIndex)
        const prevPosition = getPosition(
          i,
          prev.current[0] as number,
          prev.current[1] as number
        )
        const rank =
          firstVisableItem -
          (y < 0 ? rollerItems.length : 0) +
          position -
          firstViableItemIndex
        const configPos = dy > 0 ? position : rollerItems.length - position
        return {
          y: (-y % (ITEM_HEIGHT * rollerItems.length)) + ITEM_HEIGHT * rank,
          immediate: dy < 0 ? prevPosition > position : prevPosition < position,
          config: {
            tension: (1 + rollerItems.length - configPos) * 100,
            friction: 30 + configPos * 40,
          },
        }
      })
      prev.current = [firstVisableItem, firstViableItemIndex]
    },
    [getPosition, api]
  )
  const wheelOffset = useRef(0)
  const dragOffset = useRef(0)
  useGesture(
    {
      onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
        event.preventDefault()
        if (dy) {
          wheelOffset.current = y
          runSprings(dragOffset.current + y, dy)
        }
      },
    },
    { target, wheel: { eventOptions: { passive: false } } }
  )
  return (
    <div
      ref={target}
      className="relative flex h-66pxr w-64pxr  justify-center overflow-hidden bg-[#272727]"
    >
      {springs.map(({ y }, i) => {
        return (
          <a.div
            key={i}
            className="absolute will-change-transform"
            style={{ y, height: 22, width: '22px' }}
          >
            <a.div
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: '9px',
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
