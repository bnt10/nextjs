import type { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import CustomCalendar from '@/component/todo/calendarPage/CustomCalendar'
import EmptyTodoList from '@/component/todo/home/EmptyTodoList'
import TodoList from '@/component/todo/home/TodoList'
import TaskControlPanel from '@/component/todo/taskEditor/TaskControlPanel'
import CalendarPageLayout from '@/layouts/todo/CalendarPageLayout'
import { fetchTodoList } from '@/services/todoList/api'
import type { TodoListType } from '@/types/todoList'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const { date } = context.query

  await queryClient.prefetchQuery('todoList', () =>
    fetchTodoList(date as string)
  )

  const initialData = queryClient.getQueryData('todoList') ?? []

  return {
    props: {
      initialData,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default function TodoCalendar({ initialData }: TodoListType) {
  const isEmptyTodoList = false
  return (
    <CalendarPageLayout>
      <CustomCalendar />
      <section className="w-full shrink-0 px-24pxr">
        <TaskControlPanel onCheckedHandler={() => {}} />
      </section>
      {isEmptyTodoList ? (
        <EmptyTodoList />
      ) : (
        <TodoList initialData={initialData} />
      )}
    </CalendarPageLayout>
  )
}
TodoCalendar.defaultProps = {
  initialData: [],
}
