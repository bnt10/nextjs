import type { MouseEventHandler } from 'react'

import CircleButton from '@/component/common/CircleCheckBox'
import ImageIcon from '@/component/common/ImageIcon'
import { ICON_PRIORITY } from '@/config/icon'

import CategoryListIcon from '../modal/CategoryListTaskIcon'

interface Props {
  isCompleted: boolean
  title: string
  startDay: string
  taskIconId: string
  priority: string
  taskId: string
  onClickHandler: (taskIconId: string) => void
}

export default function TodoListItem({
  title,
  startDay,
  taskIconId,
  priority,
  onClickHandler,
  taskId,
  isCompleted,
}: Props) {
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    onClickHandler(taskId)
  }
  return (
    <div
      onClick={onClick}
      className="mb-16pxr flex h-72pxr w-full cursor-pointer items-center rounded bg-footer-gray px-10pxr py-12pxr"
    >
      <div className="mr-12pxr">
        <CircleButton clicked={isCompleted} isReadOnly />
      </div>
      <div className="flex w-full flex-col">
        <div>
          <div className="mb-6pxr text-base text-white/[0.87]">{title}</div>
        </div>
        <div className="flex justify-between">
          <div className="mr-12pxr flex flex-1 justify-between">
            <div className="mr-5pxr flex-1 text-sm text-gray-800">
              {startDay}
            </div>
            <div>
              <CategoryListIcon categoryId={taskIconId} />
            </div>
          </div>

          <div className="flex h-29pxr w-42pxr items-center rounded border border-blue-200">
            <ImageIcon
              style={'w-14pxr h-14pxr relative ml-8pxr mr-4pxr'}
              iconSrc={ICON_PRIORITY}
            />
            <span className="text-xs text-white/[087]">{priority}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
