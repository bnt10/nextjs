import Button from '@/component/common/Button'
import TaskEditorPageHeader from '@/component/todo/taskEditor/Header'
import { modalEditSaveButtonSt } from '@/styles/todo/modal/button'

import type { LayoutProps } from './type'

export default function TaskEditorPageLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg px-24pxr pb-40pxr ">
      <TaskEditorPageHeader />
      {children}
      <Button
        style={modalEditSaveButtonSt}
        title="Edit Task"
        handler={() => {}}
      />
    </div>
  )
}
