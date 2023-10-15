import React from 'react'

import Button from '@/component/common/Button'
import { ICON_DETAIL_EDIT } from '@/config/icon'
import TodoCompletedLayout from '@/layouts/todo/taskEditor/TodoCompletedLayout'
import type { ButtonStyle } from '@/types/style/common'

type Props = {
  title: string
  taskId: string
  description: string
  isCompleted: boolean
  handleTaskToggleComplete: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  handleTitleEditorOpen: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
}
const buttonStyle: ButtonStyle = {
  button: 'w-24pxr h-24pxr',
  icon: 'w-full h-full relative',
}

function TodoTask({
  title,
  description,
  isCompleted,
  handleTaskToggleComplete,
  handleTitleEditorOpen,
}: Props) {
  return (
    <div className="mb-16pxr flex w-full cursor-pointer flex-col  rounded  py-12pxr">
      <div className="flex items-start justify-between">
        <TodoCompletedLayout
          clicked={isCompleted}
          onClick={handleTaskToggleComplete}
          taskId={''}
        >
          <div className=" w-full">
            <div className="mb-6pxr w-full text-left text-base leading-[1] text-white/[0.87]">
              {title}
            </div>
            <div className="mb-6pxr w-full  text-base leading-[1] text-gray-800">
              {description}
            </div>
          </div>
        </TodoCompletedLayout>
        <Button
          handler={handleTitleEditorOpen}
          icon={ICON_DETAIL_EDIT}
          style={buttonStyle}
        />
      </div>
    </div>
  )
}

export default TodoTask
