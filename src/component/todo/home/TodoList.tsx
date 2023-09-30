import moment from 'moment'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { apiStateSelector } from '@/selectors/apiSelector'
import { schemduleDateState } from '@/selectors/dateSelector'
import { fetchTodoList } from '@/services/todoList/api'
import type { TodoListType } from '@/types/todoList'

import TodoListItem from './TodoListItem'

export default function TodoList({ initialData }: TodoListType) {
  const [apiState] = useRecoilState(apiStateSelector)
  const [schemduleDate] = useRecoilState(schemduleDateState)

  const router = useRouter()
  const {
    data = initialData,
    error,
    isLoading,
  } = useQuery('todoList', () => fetchTodoList(schemduleDate.toUTCString()), {
    initialData,
    enabled: apiState.needDate,
  })
  const renderData = apiState.needDate ? data : initialData
  if (isLoading) {
    return <div className="text-white">Loading..</div>
  }
  if (error) {
    return <div className="text-white">No data!</div>
  }
  const openDetailWithTask = (taskIconId: string) => {
    router.push(`/todo/taskEditor?taskIconId=${taskIconId}`)
  }
  const targetDate = moment(schemduleDate).format('YYYY-MM-DD')

  return (
    <div className="mb-100pxr mt-16pxr flex max-h-100vh w-full flex-col overflow-scroll px-24pxr">
      {renderData
        ?.filter((targetDay) => {
          const { year, month, day } = targetDay.targetDay.date

          return (
            targetDate ===
            moment({ year, month: month - 1, day }).format('YYYY-MM-DD')
          )
        })
        .map(({ id, title, categoryId, isCompleted, priority }) => {
          return (
            <TodoListItem
              key={id}
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
  )
}

TodoList.defaultProps = {
  initialData: [],
}
