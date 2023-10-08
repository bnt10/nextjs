import DynamicIcon from '@/component/common/Icon'
import ImageIcon from '@/component/common/ImageIcon'
import type { CategoryListType } from '@/config/category'
import { CategoryList } from '@/config/category'
import type { TaskTypeKeys } from '@/types/todoList'
import { TaskType } from '@/types/todoList'

const TaskItemIconStyle = 'relative w-24pxr h-24pxr mr-8pxr'

interface Props {
  taskType: TaskTypeKeys
  title: string
  TaskHandler: (taskType: TaskTypeKeys) => void
  icon: string
  content?: string

  customClass?: string
}

export default function TaskItem({
  taskType,
  title,
  TaskHandler,
  icon,
  content,

  customClass = '',
}: Props) {
  const handler = () => {
    TaskHandler(taskType)
  }
  const categoryInfo =
    taskType === TaskType.Category
      ? (CategoryList.find((item) => item.id === content) as CategoryListType)
      : false

  return (
    <div
      onClick={handler}
      className={`mb-34pxr flex h-37pxr w-full cursor-auto justify-between hover:cursor-pointer `}
    >
      <div className="flex items-center">
        <ImageIcon style={TaskItemIconStyle} iconSrc={icon} />
        <span className={`text-base text-white/[0.87]  ${customClass}`}>
          {title}
        </span>
      </div>
      {content && (
        <div className="flex items-center justify-center rounded-md bg-white/[0.22] px-16pxr py-8pxr">
          {categoryInfo && (
            <>
              <div className="mr-10pxr">
                <DynamicIcon
                  iconName={categoryInfo.icon}
                  color={categoryInfo.color}
                  luminance={30}
                />
              </div>

              <span className="text-white/[0.87]">{categoryInfo.title}</span>
            </>
          )}
          {!categoryInfo && (
            <>
              <span className="text-white/[0.87]"> {content}</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

TaskItem.defaultProps = {
  style: {},
}
