import { useRouter } from 'next/router'

import TaskCompleteToggle from '@/component/todo/taskEditor/TaskCompleteToggle'
import TaskItem from '@/component/todo/taskEditor/TaskItem'
import { ICON_PRIORITY, ICON_SUB, ICON_TAG, ICON_TIMER } from '@/config/icon'
import TaskEditorPageLayout from '@/layouts/todo/TaskEditorPageLayout'

const TaskType = {
  Task: 'Timer',
  Category: 'Category',
  Priority: 'Priority',
  Sub: 'Sub',
} as const

export type TaskTypeKeys = (typeof TaskType)[keyof typeof TaskType]
const TaskDetailList = [
  {
    id: 1,
    title: 'Task Time :',
    taskType: TaskType.Task,
    icon: ICON_TIMER,
  },
  {
    id: 2,
    title: 'Task Category :',
    taskType: TaskType.Category,
    icon: ICON_TAG,
  },
  {
    id: 3,
    title: 'Task Priority :',
    taskType: TaskType.Priority,
    icon: ICON_PRIORITY,
  },
  {
    id: 4,
    title: 'Sub - Task',
    taskType: TaskType.Sub,
    icon: ICON_SUB,
  },
]
export default function TaskEditor() {
  const router = useRouter()
  const { taskIconId } = router.query

  const onTaskDetailClickHandler = (taskType: TaskTypeKeys) => {
    console.log(taskType, taskIconId)
  }
  return (
    <TaskEditorPageLayout>
      <div className="flex w-full flex-col items-center justify-center px-24pxr">
        <TaskCompleteToggle />
        {TaskDetailList.map(({ id, title, taskType, icon }) => (
          <TaskItem
            key={id}
            title={title}
            taskType={taskType}
            icon={icon}
            TaskHandler={onTaskDetailClickHandler}
          />
        ))}
      </div>
    </TaskEditorPageLayout>
  )
}
