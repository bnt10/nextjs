import Button from '@/component/common/Button'
import TaskEditorPageHeader from '@/component/todo/taskEditor/Header'
import { modalCancelButtonSt } from '@/styles/todo/modal/button'

import type { LayoutProps } from './type'

export default function TaskEditorPageLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg ">
      <TaskEditorPageHeader />
      {children}
      <Button
        style={modalCancelButtonSt}
        title="Edit Task"
        handler={() => {}}
      />
    </div>
  )
}
