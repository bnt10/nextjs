import Button from '@/component/common/Button'
import ImageIcon from '@/component/common/ImageIcon'
import { ICON_TIMER } from '@/config/icon'

const TaskItemIconStyle = 'relative w-24pxr h-24pxr mr-8pxr'

const TaskItemButtonStyle = {
  icon: 'relative w-24pxr h-24pxr mr-8pxr',
  button:
    'rounded-md bg-white/[0.22] flex justify-center items-center px-16pxr py-8pxr',
  title: 'text-white/[0.87]',
}
export default function TaskItem() {
  const handler = () => {}
  return (
    <div className="flex h-37pxr w-full justify-between">
      <div className="flex items-center">
        <ImageIcon style={TaskItemIconStyle} iconSrc={ICON_TIMER} />
        <span className="text-base text-white/[0.87]">Task Time : </span>
      </div>
      <Button
        style={TaskItemButtonStyle}
        handler={handler}
        title="Today At 16:45"
      />
    </div>
  )
}
