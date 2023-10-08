import type { ButtonStyle } from '@/component/common/Button'
import Button from '@/component/common/Button'
import DynamicIcon from '@/component/common/Icon'
import { ICON_DETAIL_EDIT } from '@/config/icon'

type Props = {
  title: string
  taskId: string
  description: string
  isCompleted: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const buttonStyle: ButtonStyle = {
  button: 'w-24pxr h-24pxr',
  icon: 'w-full h-full relative',
}
function TodoTask({ title, taskId, description, onClick }: Props) {
  return (
    <div className="mb-16pxr flex w-full cursor-pointer flex-col  rounded  py-12pxr">
      <div className="flex items-start justify-between">
        <div className="mr-21pxr" data-task={taskId} onClick={onClick}>
          <DynamicIcon size={16} iconName="FaRegCircle" color="#ffffff" />
        </div>
        <div className=" w-full">
          <div className="mb-6pxr w-full text-left text-base leading-[1] text-white/[0.87]">
            {title}
          </div>
          <div className="mb-6pxr w-full  text-base leading-[1] text-gray-800">
            {description}
          </div>
        </div>
        <Button
          handler={() => {}}
          icon={ICON_DETAIL_EDIT}
          style={buttonStyle}
        />
      </div>
    </div>
  )
}

export default TodoTask
