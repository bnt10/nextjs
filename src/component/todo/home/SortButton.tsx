import { a, useSpring } from '@react-spring/web'
import { useRef } from 'react'

import DynamicIcon from '@/component/common/Icon'
import type { ToggleButtonType } from '@/types/toggleButton'

const EXPAND_STATE = 'rotate(90deg)'
const COLLAPSE_STATE = 'rotate(0deg)'

interface Props {
  title: string
  isShow: boolean
  handleToggle: ({ isShow, title }: ToggleButtonType) => void
}

const SortButton = ({ title, isShow, handleToggle }: Props) => {
  const [springProps, api] = useSpring(() => ({
    config: {
      duration: 100,
      friction: 300,
    },
    from: { transform: EXPAND_STATE },
  }))
  const toggleRef = useRef<boolean>(isShow)
  const isExpanded = () =>
    api.current[0]?.springs.transform.get() === EXPAND_STATE

  const toggleRotation = () => {
    const nextRotation = isExpanded() ? COLLAPSE_STATE : EXPAND_STATE
    api.start({ to: { transform: nextRotation } })
  }

  const handleSortListClick = () => {
    toggleRotation()
    toggleRef.current = !toggleRef.current
    handleToggle({ title, isShow: toggleRef.current })
  }

  return (
    <div
      onClick={handleSortListClick}
      className="mb-16pxr inline-flex h-31pxr  cursor-pointer items-center justify-center rounded-md bg-footer-gray px-10pxr py-5pxr"
    >
      <span className="mr-10pxr text-xs leading-normal tracking-tight text-white/[0.87]">
        {title}
      </span>
      <a.button style={springProps}>
        <DynamicIcon color={'#FFFFFFDE'} size={14} iconName="FaChevronRight" />
      </a.button>
    </div>
  )
}

export default SortButton
