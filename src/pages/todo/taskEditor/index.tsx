import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { TodoListState } from '@/atoms/todoListAtom'
import Loading from '@/component/common/Loading'
import Calendar from '@/component/todo/modal/Calendar'
import TaskCategory from '@/component/todo/modal/TaskCategory'
import TaskPriority from '@/component/todo/modal/TaskPriority'
import TaskTitleEditor from '@/component/todo/modal/TaskTitleEditor'
import { TaskDetailList } from '@/component/todo/taskEditor/constants'
import TaskItem from '@/component/todo/taskEditor/TaskItem'
import TodoTask from '@/component/todo/taskEditor/TodoTask'
import TaskEditorPageLayout from '@/layouts/todo/TaskEditorPageLayout'
import { selcetedTodoTaskSelector } from '@/selectors/selcetedTodoTaskSelector'
import {
  deleteTodoTask,
  getTasks,
  getTodoTask,
  updateTodoTask,
} from '@/services/todoList/api'
import type {
  TaskTypeKeys,
  TaskTypeToTodoItemKeyMapping,
  TodoItemClient,
  TodoItemServer,
} from '@/types/todoList'
import { TodoItemKey } from '@/types/todoList'
import { convertObjectToDate } from '@/utils/date'
import { toClientDate, toServerDate } from '@/utils/mapper'
import { updateArrayInObjectByCriteria } from '@/utils/selector'

export default function TaskEditor() {
  const router = useRouter()
  const { taskId } = router.query

  const [selectedTask, setSelectedTask] = useRecoilState(
    selcetedTodoTaskSelector
  )
  const updateTodoList = useSetRecoilState(TodoListState)
  const setModalContent = useSetRecoilState(modalContentState)

  const deleteTaskMutation = useMutation(deleteTodoTask, {
    onSuccess: () => {
      updateTodoList((todoList) => {
        return _.filter(todoList, (todo) => todo.id !== (taskId as string))
      })
      router.replace('/todo/calendar')
    },
  })

  const updateTaskMutation = useMutation(updateTodoTask, {
    onSuccess: ({ data }: { data: TodoItemServer }) => {
      updateTodoList((todoList) => {
        return updateArrayInObjectByCriteria(
          todoList,
          { id: taskId as string },
          { ...data, targetDay: toClientDate(data.targetDay) }
        )
      })
      router.replace('/todo/calendar')
    },
  })

  const { isLoading, isError } = useQuery<TodoItemClient>(
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
  useEffect(() => {
    const fetchTask = async () => {
      await getTasks()
    }
    fetchTask()
  }, [])

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
    isCompleted,
  } = selectedTask

  const taskMappingContent: TaskTypeToTodoItemKeyMapping = {
    Category: categoryId,
    Priority: priority,
    Timer: moment(toServerDate(targetDay)).format('YYYY-MM-DD HH:mm'),
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

  const taskHandler = {
    Task: {
      handleTaskToggleComplete: (isTaskCompleted: boolean) => {
        setSelectedTask({
          ...selectedTask,
          isCompleted: isTaskCompleted,
        })
      },
      handleTitleEditorOpen: () => {
        setModalContent(
          <TaskTitleEditor
            stateKey={selcetedTodoTaskSelector}
            getState={() => {
              return {
                title: todoTitle,
                description,
              }
            }}
            setState={(form: any, recoilSetState: any) => {
              const { title, description: todoDescription } = Object.keys(
                form
              ).reduce(
                (acc, element) => {
                  return {
                    ...acc,
                    [element]: form[element].value,
                  }
                },
                { title: '', description: '' }
              )
              recoilSetState({
                ...selectedTask,
                title,
                description: todoDescription,
              })
            }}
          />
        )
      },
    },
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
    Delete: async () => {
      deleteTaskMutation.mutate(todoId)
    },
  }

  const onTaskDetailClickHandler = (taskType: TaskTypeKeys) => {
    taskHandler[taskType]()
  }

  const handlEditorSave = async () => {
    updateTaskMutation.mutate(selectedTask)
  }
  return (
    <TaskEditorPageLayout handleSave={handlEditorSave}>
      <TodoTask
        description={description}
        isCompleted={isCompleted}
        handleTaskToggleComplete={taskHandler.Task.handleTaskToggleComplete}
        handleTitleEditorOpen={taskHandler.Task.handleTitleEditorOpen}
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
    </TaskEditorPageLayout>
  )
}
