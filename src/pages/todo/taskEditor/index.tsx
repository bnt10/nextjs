import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import TaskItem from '@/component/todo/taskEditor/TaskItem'
import TodoTask from '@/component/todo/taskEditor/TodoTask'
import { ICON_PRIORITY, ICON_TAG, ICON_TIMER, ICON_TRASH } from '@/config/icon'
import TaskEditorPageLayout from '@/layouts/todo/TaskEditorPageLayout'
import { getTodoTask } from '@/services/todoList/api'
import type {
  TaskTypeKeys,
  TaskTypeToTodoItemKeyMapping,
  TodoItem,
} from '@/types/todoList'
import { TaskType } from '@/types/todoList'
import { combineDateAndTime } from '@/utils/convert'

const TaskDetailList = [
  {
    id: 1,
    title: 'Task Time :',
    taskType: TaskType.Timer,
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
    title: 'Delete Task',
    taskType: TaskType.Delete,
    icon: ICON_TRASH,
    customClass: 'text-red-600',
  },
]
export default function TaskEditor() {
  const router = useRouter()
  const { taskId } = router.query

  const { data, isLoading, isError } = useQuery<TodoItem>(
    ['todoTask', taskId],
    () => getTodoTask(taskId as string),
    { enabled: router.isReady }
  )
  if (isLoading) {
    return <div>is loading...</div>
  }
  if (isError) {
    return <div>is Error Page</div>
  }
  if (!data) {
    return <div>is Error Page</div>
  }

  const {
    description,
    id: todoId,
    categoryId,
    isCompleted,
    priority,
    targetDay,
    title: todoTitle,
  } = data

  const taskMappingContent: TaskTypeToTodoItemKeyMapping = {
    Category: categoryId,
    Priority: priority,
    Timer: combineDateAndTime(targetDay.date, targetDay.time).format(
      'MM-DD HH:mm'
    ),
  }
  const onTaskDetailClickHandler = (taskType: TaskTypeKeys) => {
    console.log(taskType, taskId)
  }

  return (
    <TaskEditorPageLayout>
      <section className="flex w-full flex-col items-center justify-center">
        <TodoTask
          description={description}
          isCompleted={isCompleted}
          onClick={() => {}}
          taskId={todoId}
          title={todoTitle}
        />
        {TaskDetailList.map(({ id, title, taskType, icon, customClass }) => (
          <TaskItem
            key={id}
            title={title}
            taskType={taskType}
            icon={icon}
            content={taskMappingContent[taskType]}
            customClass={customClass}
            TaskHandler={onTaskDetailClickHandler}
          />
        ))}
      </section>
    </TaskEditorPageLayout>
  )
}
