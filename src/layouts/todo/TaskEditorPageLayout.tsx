import Button from '@/component/common/Button'
import TaskEditorPageHeader from '@/component/todo/taskEditor/Header'
import { modalEditSaveButtonSt } from '@/styles/todo/modal/button'

import Layout from '..'
import type { LayoutProps } from './type'

export default function TaskEditorPageLayout({
  handleSave,
  children,
}: LayoutProps) {
  return (
    <div className="flex justify-center">
      <Layout>
        <TaskEditorPageHeader />
        <section className="flex w-full flex-col items-center justify-center">
          {children}
        </section>
        <footer className="absolute bottom-40pxr w-full">
          <Button
            style={modalEditSaveButtonSt}
            title="Edit Task"
            handler={handleSave}
          />
        </footer>
      </Layout>
    </div>
  )
}
