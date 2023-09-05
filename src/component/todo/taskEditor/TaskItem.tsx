import type { ButtonStyle } from '@/component/common/Button'
import Button from '@/component/common/Button'
import ImageIcon from '@/component/common/ImageIcon'
import type { TaskTypeKeys } from '@/pages/todo/taskEditor'
import tw from '@/utils/twMergeObjects'

const TaskItemIconStyle = 'relative w-24pxr h-24pxr mr-8pxr'

const TaskItemButtonStyle: ButtonStyle = {
  icon: 'relative w-24pxr h-24pxr mr-8pxr',
  button:
    'rounded-md bg-white/[0.22] flex justify-center items-center px-16pxr py-8pxr',
  title: 'text-white/[0.87]',
}

interface Props {
  taskType: TaskTypeKeys
  title: string
  style?: ButtonStyle
  TaskHandler: (taskType: TaskTypeKeys) => void
  icon: string
}
export default function TaskItem({
  taskType,
  title,
  style,
  TaskHandler,
  icon,
}: Props) {
  const handler = () => {
    TaskHandler(taskType)
  }
  const buttonStyle = tw<ButtonStyle>(TaskItemButtonStyle, style)
  return (
    <div className="mb-34pxr flex h-37pxr w-full justify-between">
      <div className="flex items-center">
        <ImageIcon style={TaskItemIconStyle} iconSrc={icon} />
        <span className="text-base text-white/[0.87]">{title}</span>
      </div>
      <Button style={buttonStyle} handler={handler} title="Today At 16:45" />
    </div>
  )
}

TaskItem.defaultProps = {
  style: {},
}
