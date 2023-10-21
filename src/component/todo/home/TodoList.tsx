import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { apiStateSelector } from '@/selectors/apiSelector'
import { schemduleDateState } from '@/selectors/dateSelector'
import { todoListStateSelector } from '@/selectors/todoListSelector'
import { fetchTodoList, getTasks } from '@/services/todoList/api'
import type { InitialDataType } from '@/types/todoList'

import EmptyTodoList from './EmptyTodoList'
import TodoListItem from './TodoListItem'

export default function TodoList({ initialData }: InitialDataType) {
  const [apiState, setApiState] = useRecoilState(apiStateSelector)
  const [schemduleDate] = useRecoilState(schemduleDateState)
  const [todoList, setTodoList] = useRecoilState(todoListStateSelector)
  const router = useRouter()

  const { error, isLoading } = useQuery(
    'todoList',
    () => fetchTodoList(schemduleDate.toString()),
    {
      initialData,
      enabled: apiState.needDate,
      onSuccess: (addDate) => {
        setTodoList(addDate)
        setApiState((prev) => ({ ...prev, needDate: false }))
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
    return <div className="text-white">Loading..</div>
  }
  if (error) {
    return <div className="text-white">No data!</div>
  }
  const openDetailWithTask = (taskId: string) => {
    router.push(`/todo/taskEditor?taskId=${taskId}`)
  }

  return (
    <>
      {todoList.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <div className="mb-100pxr mt-16pxr flex max-h-100vh w-full flex-col overflow-y-scroll px-24pxr scrollbar-hide">
          {todoList.map(({ id, title, categoryId, isCompleted, priority }) => {
            return (
              <TodoListItem
                key={id}
                taskId={id}
                isCompleted={isCompleted}
                title={title}
                startDay={'Today At 16:45'}
                taskIconId={categoryId}
                priority={priority}
                onClickHandler={openDetailWithTask}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

TodoList.defaultProps = {
  initialData: [],
}
