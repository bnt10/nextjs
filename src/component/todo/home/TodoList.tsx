import { useQuery } from 'react-query'

import { fetchTodoList } from '@/services/todoList/api'

import SortButton from './SortButton'
import TodoListItem from './TodoListItem'
import TodoSearchBar from './TodoSearchBar'

export default function TodoList() {
  const { data, error, isLoading } = useQuery('todoList', fetchTodoList)
  if (isLoading) {
    return <div>Loading..</div>
  }
  if (error) {
    return <div>No data!</div>
  }

  return (
    <div className="mt-16pxr flex w-full flex-col px-24pxr">
      <TodoSearchBar />
      <SortButton title={'Today'} />
      {data?.map(
        ({ id, title, categoryId, isCompleted, priority, targetDay }) => {
          console.log(targetDay)
          return (
            <TodoListItem
              key={id}
              isComplated={isCompleted}
              title={title}
              startDay={'Today At 16:45'}
              taskIconId={categoryId}
              priority={priority}
            />
          )
        }
      )}
    </div>
  )
}
