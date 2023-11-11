import { useRecoilValue } from 'recoil'

import EmptyTodoList from '@/component/todo/home/EmptyTodoList'
import SortButton from '@/component/todo/home/SortButton'
import TodoList from '@/component/todo/home/TodoList'
import TodoSearchBar from '@/component/todo/home/TodoSearchBar'
import HomeLayout from '@/layouts/todo/HomeLayout'
import { todoListStateSelector } from '@/selectors/todoListSelector'

export default function TodoHome() {
  const todolist = useRecoilValue(todoListStateSelector)
  return (
    <>
      <HomeLayout>
        <div className="flex w-full flex-col items-center justify-center overflow-y-scroll px-24pxr scrollbar-hide">
          <TodoSearchBar />

          {todolist.length < 1 ? (
            <EmptyTodoList />
          ) : (
            <section className="flex w-full flex-col items-center justify-center">
              <section className="w-full">
                <SortButton title={'Today'} />
                <TodoList renderType={false} />
              </section>
              {todolist.findIndex((task) => task.isCompleted === true) !==
                -1 && (
                <section className="w-full">
                  <SortButton title={'Completed'} />
                  <TodoList renderType={true} />
                </section>
              )}
            </section>
          )}
        </div>
      </HomeLayout>
    </>
  )
}
