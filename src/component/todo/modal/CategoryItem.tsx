import { a, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

import type { IconKeys } from '@/component/common/Icon'
import DynamicIcon from '@/component/common/Icon'

interface Props {
  icon: IconKeys
  color?: string
  title?: string
  id: string
  onCategoryClickHandler: (id: string) => void
  selected: boolean
}
const DefaultConfWithCategory = {
  color: '#fff',
  config: {
    tension: 500,
    friction: 50,
    duration: 100,
  },
}
const UpdateConfWithCategory = (color: string) => ({
  color,
})
export default function CategoryItem({
  id,
  icon,
  title = 'Create New',
  color = '#80FFD1',
  selected,
  onCategoryClickHandler,
}: Props) {
  const [springValues, api] = useSpring(() => DefaultConfWithCategory, [])
  const startSelectedEffect = () =>
    api.start(() => {
      return UpdateConfWithCategory(color)
    })
  const onClick = () => {
    onCategoryClickHandler(id)
    startSelectedEffect()
  }
  useEffect(() => {
    if (selected) {
      startSelectedEffect()
    }
  }, [])

  return (
    <a.div className="flex w-1/3 flex-col items-center">
      <a.button
        className="relative mb-5pxr flex h-64pxr w-64pxr items-center justify-center rounded"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        <DynamicIcon iconName={icon} color={color} luminance={30} />
      </a.button>
      <a.p
        style={{ color: selected === true ? springValues.color : '#FFFFFFDF' }}
        className="mb-16pxr text-sm font-medium "
      >
        {title}
      </a.p>
    </a.div>
  )
}
