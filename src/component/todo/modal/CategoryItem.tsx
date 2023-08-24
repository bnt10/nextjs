import type { IconKeys } from '@/component/common/Icon'
import DynamicIcon from '@/component/common/Icon'

interface Props {
  icon: IconKeys
  color?: string
  title?: string
  id: string
  onCategoryClickHandler: (id: string) => void
}
export default function CategoryItem({
  id,
  icon,
  title = 'Create New',
  color = '#80FFD1',
  onCategoryClickHandler,
}: Props) {
  const onClick = () => {
    onCategoryClickHandler(id)
  }
  return (
    <div className="flex w-1/3 flex-col items-center">
      <button
        className=" mb-5pxr flex h-64pxr w-64pxr items-center justify-center rounded"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        <DynamicIcon iconName={icon} color={color} />
      </button>
      <p className="mb-16pxr text-sm font-medium text-white/[87]">{title}</p>
    </div>
  )
}
