import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { apiStateSelector } from '@/selectors/apiSelector'
import { scheduleDateState } from '@/selectors/dateSelector'
import { todoListStateSelector } from '@/selectors/todoListSelector'
import { fetchTodoList } from '@/services/todoList/api'
import type { InitialDataType } from '@/types/todoList'
import { toRelatvieDay } from '@/utils/date'
import { toServerDate } from '@/utils/mapper'

import EmptyTodoList from './EmptyTodoList'
import TodoListItem from './TodoListItem'

interface Props extends InitialDataType {
  renderType: boolean
}
export default function TodoList({ initialData, renderType }: Props) {
  const router = useRouter()
  const scheduleDate = useRecoilValue(scheduleDateState)

  const [apiState, setApiState] = useRecoilState(apiStateSelector)
  const [todoList, setTodoList] = useRecoilState(todoListStateSelector)

  const { error, isLoading } = useQuery(
    'todoList',
    () => fetchTodoList(scheduleDate.toString()),
    {
      initialData,
      enabled: apiState.needDate,
      onSuccess: (addDate) => {
        setTodoList(addDate.filter((task) => task.isCompleted === renderType))
        setApiState((prev) => ({ ...prev, needDate: false }))
      },
    }
  )

  if (isLoading) {
    return <div className="text-white">Loading..</div>
  }
  if (error) {
    return <div className="text-white">No data!</div>
  }

  const openDetailWithTask = (taskId: string) => {
    router.push(`/protected/todo/taskEditor?taskId=${taskId}`)
  }

  return (
    <>
      {todoList.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <div className="mt-16pxr flex w-full flex-col ">
          {todoList
            .filter((item) => item.isCompleted === renderType)
            .map(
              ({ id, title, categoryId, isCompleted, priority, targetDay }) => {
                return (
                  <TodoListItem
                    key={id}
                    taskId={id}
                    isCompleted={isCompleted}
                    title={title}
                    startDay={toRelatvieDay(toServerDate(targetDay))}
                    taskIconId={categoryId}
                    priority={priority}
                    onClickHandler={openDetailWithTask}
                  />
                )
              }
            )}
        </div>
      )}
    </>
  )
}

TodoList.defaultProps = {
  initialData: [],
}
