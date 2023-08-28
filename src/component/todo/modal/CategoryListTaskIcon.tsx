import DynamicIcon from '@/component/common/Icon'
import type { CategoryListType } from '@/config/category'
import { CategoryList } from '@/config/category'

interface Props {
  categoryId: string
}

export default function CategoryListIcon({ categoryId }: Props) {
  const { icon, color, title } = CategoryList.find(
    (item) => item.id === categoryId
  ) as CategoryListType
  return (
    <div
      className="flex items-center justify-center rounded px-8pxr py-4pxr"
      style={{ backgroundColor: color }}
    >
      <div className="mr-5pxr">
        <DynamicIcon size={10} iconName={icon} color={color} luminance={30} />
      </div>
      <span className="text-xs text-white">{title}</span>
    </div>
  )
}
