import type { IconKeys } from '@/component/common/Icon'
import DynamicIcon from '@/component/common/Icon'

interface Props {
  icon: IconKeys
  color?: string
}
export default function CategoryItem({ icon, color = '#80FFD1' }: Props) {
  return (
    <div className="w-1/3">
      <div
        className=" flex h-64pxr w-64pxr items-center justify-center rounded"
        style={{ backgroundColor: color }}
      >
        <DynamicIcon iconName={icon} color={color} />
      </div>
    </div>
  )
}
