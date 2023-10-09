import type { GetServerSidePropsContext } from 'next'
import { useEffect } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'

import CustomCalendar from '@/component/todo/calendarPage/CustomCalendar'
import TodoList from '@/component/todo/home/TodoList'
import TaskControlPanel from '@/component/todo/taskEditor/TaskControlPanel'
import CalendarPageLayout from '@/layouts/todo/CalendarPageLayout'
import { todoListStateSelector } from '@/selectors/todoListSelector'
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
      isLoading: false,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default function TodoCalendar({ initialData, isLoading }: TodoListType) {
  const setTodoList = useSetRecoilState(todoListStateSelector)

  useEffect(() => {
    if (initialData.length > 0) {
      setTodoList(initialData)
    }
  }, [])
  if (isLoading) {
    return <>is Loading..</>
  }
  return (
    <CalendarPageLayout>
      <CustomCalendar initialData={initialData} />
      <section className="w-full shrink-0 px-24pxr">
        <TaskControlPanel onCheckedHandler={() => {}} />
      </section>

      <TodoList initialData={initialData} />
    </CalendarPageLayout>
  )
}
TodoCalendar.defaultProps = {
  initialData: [],
  isLoading: true,
}
