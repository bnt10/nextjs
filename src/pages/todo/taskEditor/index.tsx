import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import Loading from '@/component/common/Loading'
import Calendar from '@/component/todo/modal/Calendar'
import TaskCategory from '@/component/todo/modal/TaskCategory'
import TaskPriority from '@/component/todo/modal/TaskPriority'
import TaskItem from '@/component/todo/taskEditor/TaskItem'
import TodoTask from '@/component/todo/taskEditor/TodoTask'
import { ICON_PRIORITY, ICON_TAG, ICON_TIMER, ICON_TRASH } from '@/config/icon'
import TaskEditorPageLayout from '@/layouts/todo/TaskEditorPageLayout'
import { selcetedTodoTaskSelector } from '@/selectors/selcetedTodoTaskSelector'
import { getTodoTask } from '@/services/todoList/api'
import type {
  TaskTypeKeys,
  TaskTypeToTodoItemKeyMapping,
  TodoItem,
} from '@/types/todoList'
import { TaskType, TodoItemKey } from '@/types/todoList'
import { combineDateAndTime } from '@/utils/convert'
import { convertObjectToDate } from '@/utils/date'

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
  const [clicked, setClicked] = useState(false)
  const setModalContent = useSetRecoilState(modalContentState)

  const [selectedTask, setSelectedTask] = useRecoilState(
    selcetedTodoTaskSelector
  )

  const { isLoading, isError } = useQuery<TodoItem>(
    ['todoTask', taskId],
    () => getTodoTask(taskId as string),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      onSuccess: (addDate) => {
        setSelectedTask(addDate)
      },
    }
  )

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>is Error Page</div>
  }

  if (!selectedTask) {
    return <div>is Error Page</div>
  }

  const {
    description,
    id: todoId,
    categoryId,
    priority,
    targetDay,
    title: todoTitle,
  } = selectedTask

  const taskMappingContent: TaskTypeToTodoItemKeyMapping = {
    Category: categoryId,
    Priority: priority,
    Timer: combineDateAndTime(targetDay.date, targetDay.time).format(
      'YYYY-MM-DD HH:mm'
    ),
  }

  const getTaskDetailData = (element: string) => (state: any) => {
    if (element === TodoItemKey.targetDay) {
      const { date, time } = state[element]
      return {
        date: convertObjectToDate(date),
        time,
      }
    }
    return state[element]
  }
  const setTaskDetailData =
    (element: string) => (newState: any, recoilSetState: any) => {
      recoilSetState({
        ...selectedTask,
        [element]: newState,
      })
    }
  const taskMappingFn = {
    Category: () => {
      setModalContent(
        <TaskCategory
          stateKey={selcetedTodoTaskSelector}
          getState={getTaskDetailData(TodoItemKey.categoryId)}
          setState={setTaskDetailData(TodoItemKey.categoryId)}
        />
      )
    },
    Priority: () =>
      setModalContent(
        <TaskPriority
          stateKey={selcetedTodoTaskSelector}
          getState={getTaskDetailData(TodoItemKey.priority)}
          setState={setTaskDetailData(TodoItemKey.priority)}
        />
      ),
    Timer: () => {
      setModalContent(
        <Calendar
          stateKey={selcetedTodoTaskSelector}
          getState={getTaskDetailData(TodoItemKey.targetDay)}
          setState={setTaskDetailData(TodoItemKey.targetDay)}
        />
      )
    },
    Delete: () => {},
  }
  const onTaskDetailClickHandler = (taskType: TaskTypeKeys) => {
    taskMappingFn[taskType]()
  }

  return (
    <TaskEditorPageLayout>
      <section className="flex w-full flex-col items-center justify-center">
        <TodoTask
          description={description}
          isCompleted={clicked}
          onClick={() => {
            setClicked(!clicked)
          }}
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
