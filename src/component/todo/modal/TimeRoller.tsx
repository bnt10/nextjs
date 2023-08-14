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

  const [springs, api] = useSprings(rollerLength, (rollerIndex: number) => {
    return {
      y:
        rollerIndex < rollerLength - 1
          ? ITEM_HEIGHT * rollerIndex
          : -ITEM_HEIGHT,
    }
  })

  const target = useRef<HTMLDivElement | null>(null)
  const firstVisibleItemIndex = useRef(0)

  const runSprings = useCallback(() => {
    const firstVisableItem = firstVisibleItemIndex.current

    api.start((i) => {
      const position = getPosition(i, firstVisableItem, rollerLength)
      const lastIndex = circularIndex(firstVisableItem - 1, rollerLength)

      return {
        y: i === lastIndex ? -ITEM_HEIGHT : ITEM_HEIGHT * position,
        immediate: i === lastIndex || position > visiableCount - 1,
      }
    })
  }, [getPosition, api])

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

          runSprings()
        }
      },
      onClick: ({ event }) => {
        event.preventDefault()

        firstVisibleItemIndex.current += +1
        firstVisibleItemIndex.current =
          (firstVisibleItemIndex.current + rollerLength) % rollerLength

        runSprings()
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
