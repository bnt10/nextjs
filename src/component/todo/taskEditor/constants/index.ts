import { ICON_PRIORITY, ICON_TAG, ICON_TIMER, ICON_TRASH } from '@/config/icon'
import { TaskType } from '@/types/todoList'

export const TaskDetailList = [
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
