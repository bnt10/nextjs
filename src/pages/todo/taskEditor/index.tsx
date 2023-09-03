import { useRouter } from 'next/router'

import TaskItem from '@/component/todo/taskEditor/TaskItem'
import TaskEditorPageLayout from '@/layouts/todo/TaskEditorPageLayout'

export default function TaskEditor() {
  const router = useRouter()
  const { taskIconId } = router.query
  console.log(taskIconId)
  return (
    <TaskEditorPageLayout>
      <div className="flex h-37pxr w-full items-center justify-center px-24pxr">
        <TaskItem />
      </div>
    </TaskEditorPageLayout>
  )
}
