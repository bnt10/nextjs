import type { ReactNode } from 'react'
import { useState } from 'react'

import CircleButton from '@/component/common/CircleCheckBox'

interface Props {
  clicked: boolean
  children: ReactNode
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  taskId: string
}
export default function TodoCompletedLayout({
  clicked,
  taskId,
  onClick,
  children,
}: Props) {
  const [pressed, setPressed] = useState(false)
  const handleMouseDown = () => {
    setPressed(true)
  }

  const handleMouseUp = () => {
    setPressed(false)
  }

  return (
    <section
      className="flex justify-between"
      data-task={taskId}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="mr-21pxr pl-2pxr">
        <CircleButton clicked={clicked} pressed={pressed} />
      </div>
      {children}
    </section>
  )
}
