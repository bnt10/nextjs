import Button from '@/component/common/Button'
import { ICON_PRIORITY } from '@/config/icon'

interface Props {
  title: string
  selectedPriority: boolean
  onClick: (value: number) => void
}
export default function TaskPriorityItem({
  title,
  selectedPriority,
  onClick,
}: Props) {
  const selectedBgStyle = selectedPriority ? 'bg-primary' : 'bg-gray-200'
  const buttonStyles = {
    button: `flex box-border mb-16pxr flex-shrink-0 w-64pxr h-64pxr flex-col justify-center rounded items-center ${selectedBgStyle}`,
    icon: 'relative w-24pxr h-24pxr mb-5pxr',
    title: 'text-base w-24pxr text-white/[0.87]',
  }
  const handler = () => {
    onClick(parseInt(title, 10))
  }
  return (
    <div className="flex w-1/4 justify-center">
      <Button
        icon={ICON_PRIORITY}
        style={buttonStyles}
        title={title}
        handler={handler}
      />
    </div>
  )
}
