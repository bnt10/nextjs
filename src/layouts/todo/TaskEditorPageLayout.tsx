import Button from '@/component/common/Button'
import TaskEditorPageHeader from '@/component/todo/taskEditor/Header'
import { modalEditSaveButtonSt } from '@/styles/todo/modal/button'

import type { LayoutProps } from './type'

export default function TaskEditorPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-screen flex-col items-center bg-app-bg px-24pxr pb-40pxr foldable:w-375pxr">
        <TaskEditorPageHeader />
        <section className="flex w-full flex-col items-center justify-center">
          {children}
        </section>
        <footer className="absolute bottom-40pxr w-full">
          <Button
            style={modalEditSaveButtonSt}
            title="Edit Task"
            handler={() => {}}
          />
        </footer>
      </div>
    </div>
  )
}
