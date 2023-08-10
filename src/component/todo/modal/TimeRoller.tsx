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
    (currentItemIndex: number, firstVisableItem: number) => {
      const actualPosition = currentItemIndex - firstVisableItem
      return circularIndex(actualPosition)
    },
    [circularIndex]
  )

  const [springs, api] = useSprings(rollerLength, (rollerIndex: number) => {
    return { y: ITEM_HEIGHT * rollerIndex }
  })
  const prev = useRef(0)
  const target = useRef<HTMLDivElement | null>(null)
  const firstVisibleItemIndex = useRef(0)

  const runSprings = useCallback(
    (dy: number) => {
      let firstVisibleItem = firstVisibleItemIndex.current

      if (dy < 0) {
        firstVisibleItem = firstVisibleItem === 0 ? 23 : firstVisibleItem - 1
      } else {
        firstVisibleItem = (firstVisibleItem + 1) % 24
      }

      api.start((i) => {
        const position = (i + firstVisibleItem) % 24
        const yValue = position * ITEM_HEIGHT

        return {
          y: yValue,
          immediate: true,
        }
      })
      firstVisibleItemIndex.current = firstVisibleItem
    },
    [api]
  )

  const wheelOffset = useRef(0)

  useGesture(
    {
      onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
        event.preventDefault()
        if (dy && wheelOffset.current !== y) {
          wheelOffset.current = y

          firstVisibleItemIndex.current += dy > 0 ? 1 : -1
          firstVisibleItemIndex.current =
            (firstVisibleItemIndex.current + rollerLength) % rollerLength

          runSprings(dy)
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
            className="absolute flex items-center justify-center will-change-transform"
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
