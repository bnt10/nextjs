import { a, useSpring } from '@react-spring/web'

import DynamicIcon from '@/component/common/Icon'

const EXPAND_STATE = 'rotate(90deg)'
const COLLAPSE_STATE = 'rotate(0deg)'

interface Props {
  title: string
}

const SortButton = ({ title }: Props) => {
  const [springProps, api] = useSpring(() => ({
    config: {
      duration: 100,
      friction: 300,
    },
    from: { transform: EXPAND_STATE },
  }))

  const isExpanded = () =>
    api.current[0]?.springs.transform.get() === EXPAND_STATE

  const toggleRotation = () => {
    const nextRotation = isExpanded() ? COLLAPSE_STATE : EXPAND_STATE
    api.start({ to: { transform: nextRotation } })
  }

  const handleSortListClick = () => {
    toggleRotation()
  }

  return (
    <div
      onClick={handleSortListClick}
      className="mb-16pxr inline-flex h-31pxr  items-center justify-center rounded-md bg-footer-gray px-10pxr py-5pxr"
    >
      <span className="mr-10pxr text-xs leading-normal tracking-tight text-white/[0.87]">
        {title}
      </span>
      <a.div style={springProps}>
        <DynamicIcon color={'#FFFFFFDE'} size={14} iconName="FaChevronRight" />
      </a.div>
    </div>
  )
}

export default SortButton
