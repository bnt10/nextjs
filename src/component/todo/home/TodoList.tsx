import moment from 'moment'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next/types'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { schemduleDateState } from '@/selectors/dateSelector'
import { fetchTodoList } from '@/services/todoList/api'
import type { TodoItem } from '@/types/todoList'

import TodoListItem from './TodoListItem'

type TodoListProps = {
  initialData: TodoItem[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  const { date } = context.query // 쿼리 스트링에서 날짜를 가져옵니다.

  await queryClient.prefetchQuery('todoList', () =>
    fetchTodoList(date as string)
  ) // 선택적 날짜를 넘겨줍니다.

  const initialData = queryClient.getQueryData('todoList')

  return {
    props: {
      initialData,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function TodoList({ initialData }: TodoListProps) {
  const router = useRouter()
  const {
    data = initialData,
    error,
    isLoading,
  } = useQuery('todoList', () => fetchTodoList(), {
    initialData,
  })

  const [schemduleDate] = useRecoilState(schemduleDateState)

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
      {data
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
              isComplated={isCompleted}
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
