import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import TaskItem from '@/component/todo/taskEditor/TaskItem'
import TodoTask from '@/component/todo/taskEditor/TodoTask'
import {
  ICON_PRIORITY,
  ICON_SUB,
  ICON_TAG,
  ICON_TIMER,
  ICON_TRASH,
} from '@/config/icon'
import TaskEditorPageLayout from '@/layouts/todo/TaskEditorPageLayout'
import { getTodoTask } from '@/services/todoList/api'

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
    content: 'Today At 16:45',
  },
  {
    id: 2,
    title: 'Task Category :',
    taskType: TaskType.Category,
    icon: ICON_TAG,
    contentIconID: '5',
  },
  {
    id: 3,
    title: 'Task Priority :',
    taskType: TaskType.Priority,
    icon: ICON_PRIORITY,
    content: 'Default',
  },
  {
    id: 4,
    title: 'Sub - Task',
    taskType: TaskType.Sub,
    icon: ICON_SUB,
    content: 'Add Sub - Task',
  },
  {
    id: 5,
    title: 'Delete Task',
    taskType: TaskType.Sub,
    icon: ICON_TRASH,
    customClass: 'text-red-600',
  },
]
export default function TaskEditor() {
  const router = useRouter()
  const { taskId } = router.query

  const { data, isLoading, isError } = useQuery('todoTask', () =>
    getTodoTask(taskId as string)
  )
  if (isLoading) {
    return <div>is loading...</div>
  }
  if (isError) {
    return <div>is Error Page</div>
  }

  
  console.log(data)
  const onTaskDetailClickHandler = (taskType: TaskTypeKeys) => {
    console.log(taskType, taskId)
  }
  return (
    <TaskEditorPageLayout>
      <section className="flex w-full flex-col items-center justify-center">
        <TodoTask
          description="ss"
          onClick={() => {}}
          taskId="1"
          title="Do Math Homework"
        />
        {TaskDetailList.map(
          ({
            id,
            title,
            taskType,
            icon,
            content,
            contentIconID,
            customClass,
          }) => (
            <TaskItem
              key={id}
              title={title}
              taskType={taskType}
              icon={icon}
              content={content}
              customClass={customClass}
              contentIconID={contentIconID}
              TaskHandler={onTaskDetailClickHandler}
            />
          )
        )}
      </section>
    </TaskEditorPageLayout>
  )
}
