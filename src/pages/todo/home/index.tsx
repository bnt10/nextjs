import { useQuery } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import EmptyTodoList from '@/component/todo/home/EmptyTodoList'
import SortButton from '@/component/todo/home/SortButton'
import TodoList from '@/component/todo/home/TodoList'
import TodoSearchBar from '@/component/todo/home/TodoSearchBar'
import HomeLayout from '@/layouts/todo/HomeLayout'
import { schemduleDateState } from '@/selectors/dateSelector'
import { todoListStateSelector } from '@/selectors/todoListSelector'
import { fetchTodoList } from '@/services/todoList/api'
import type { TodoItemClient } from '@/types/todoList'

export default function TodoHome() {
  const schemduleDate = useRecoilValue(schemduleDateState)
  const [todoList, setTodoList] = useRecoilState(todoListStateSelector)

  const { error, isLoading } = useQuery(
    'todoList',
    () => fetchTodoList(schemduleDate.toString()),
    {
      onSuccess: (data: TodoItemClient[]) => {
        setTodoList(data)
      },
    }
  )

  if (error) return <div>Error occurred</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <HomeLayout>
        <div className="mt-16pxr flex w-full flex-col items-center justify-center overflow-y-scroll px-24pxr scrollbar-hide">
          <TodoSearchBar />
          <div className="flex grow flex-col overflow-y-scroll scrollbar-hide">
            {todoList.length < 1 ? (
              <EmptyTodoList />
            ) : (
              <section className="flex w-full flex-col items-center justify-center">
                <section className="w-full">
                  <SortButton title={'Today'} />
                  <TodoList renderType={false} />
                </section>
                {todoList.findIndex((task) => task.isCompleted === true) !==
                  -1 && (
                  <section className="w-full">
                    <SortButton title={'Completed'} />
                    <TodoList renderType={true} />
                  </section>
                )}
              </section>
            )}
          </div>
        </div>
      </HomeLayout>
    </>
  )
}
