import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { fetchTodoList } from '@/services/todoList/api'
import type { TodoItem } from '@/types/todoList'

import SortButton from './SortButton'
import TodoListItem from './TodoListItem'
import TodoSearchBar from './TodoSearchBar'

type TodoListProps = {
  initialData: TodoItem[]
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('todoList', fetchTodoList)

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
  } = useQuery('todoList', fetchTodoList, {
    initialData,
  })
  if (isLoading) {
    return <div className="text-white">Loading..</div>
  }
  if (error) {
    return <div className="text-white">No data!</div>
  }
  const openDetailWithTask = (taskIconId: string) => {
    router.push(`/todo/taskEditor?taskIconId=${taskIconId}`)
  }
  return (
    <div className="mt-16pxr flex w-full flex-col px-24pxr">
      <TodoSearchBar />
      <SortButton title={'Today'} />
      {data?.map(({ id, title, categoryId, isCompleted, priority }) => {
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
