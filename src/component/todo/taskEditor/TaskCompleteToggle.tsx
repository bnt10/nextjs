import type { ButtonStyle } from '@/component/common/Button'
import Button from '@/component/common/Button'
import DynamicIcon from '@/component/common/Icon'
import { ICON_DETAIL_EDIT } from '@/config/icon'

const buttonStyle: ButtonStyle = {
  button: 'w-48pxr h-48pxr flex justify-center items-center',
  icon: 'w-24pxr h-24pxr relative',
}

interface Props {
  taskId: string
  onCompleteHandler: (taskId: string) => void
}

export default function TaskCompleteToggle({
  onCompleteHandler,
  taskId,
}: Props) {
  const onClick = () => {
    onCompleteHandler(taskId)
  }
  return (
    <div className="mb-38pxr mt-13pxr flex h-74pxr w-full min-w-[327pxr] items-start">
      <div onClick={onClick} className="flex hover:cursor-pointer">
        <div className="mr-15pxr mt-6pxr flex">
          <DynamicIcon iconName="FaRegCircle" color="#ffffff" />
        </div>

        <div className="mr-67pxr">
          <p className="mb-15pxr text-xl text-white/[0.87]">Do Math Homework</p>
          <p className="text-gray-900">Do chapter 2 to 5 for next week</p>
        </div>
      </div>
      <Button style={buttonStyle} handler={() => {}} icon={ICON_DETAIL_EDIT} />
    </div>
  )
}
