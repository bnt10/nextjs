import type { IconKeys } from '@/component/common/Icon'
import DynamicIcon from '@/component/common/Icon'

interface Props {
  icon: IconKeys
  style?: React.CSSProperties | undefined
}
export default function CategoryItem({ icon, style }: Props) {
  return (
    <div className="w-1/3">
      <div className="h-64pxr w-64pxr rounded ">
        <DynamicIcon iconName={icon} style={style} />
      </div>
    </div>
  )
}
