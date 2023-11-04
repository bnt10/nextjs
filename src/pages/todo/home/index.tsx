import EmptyTodoList from '@/component/todo/home/EmptyTodoList'
import SortButton from '@/component/todo/home/SortButton'
import TodoList from '@/component/todo/home/TodoList'
import TodoSearchBar from '@/component/todo/home/TodoSearchBar'
import HomeLayout from '@/layouts/todo/HomeLayout'

export default function TodoHome() {
  const isEmptyTodoList = false

  return (
    <>
      <HomeLayout>
        <div className="flex w-full flex-col items-center justify-center">
          <TodoSearchBar />
          <SortButton title={'Today'} />
          {isEmptyTodoList ? <EmptyTodoList /> : <TodoList />}
        </div>
      </HomeLayout>
    </>
  )
}
