import DynamicIcon from '@/component/common/Icon'
import type { ConfigItemType } from '@/types/config'

export default function ConfigItem({ icon, title, handler }: ConfigItemType) {
  return (
    <button
      onClick={handler}
      className="mb-8pxr flex h-48pxr w-full items-center justify-center"
    >
      <div className="mr-10pxr h-24pxr w-24pxr">
        <DynamicIcon color="#FFFFFF" iconName={icon} />
      </div>
      <span className="flex-1 text-left text-base text-white">{title}</span>
      <div>
        <DynamicIcon color="#FFFFFF" iconName={'HiOutlineChevronRight'} />
      </div>
    </button>
  )
}
