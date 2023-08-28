import SortButton from './SortButton'
import TodoListItem from './TodoListItem'
import TodoSearchBar from './TodoSearchBar'

export default function TodoList() {
  return (
    <div className="mt-16pxr flex w-full flex-col px-24pxr">
      <TodoSearchBar />
      <SortButton title={'Today'} />
      <TodoListItem
        isComplated={false}
        title={'Do Math Homework'}
        startDay={'Today At 16:45'}
        taskIconId={'5'}
        priority={'1'}
      />
      <TodoListItem
        isComplated={false}
        title={'Tack out dogs'}
        startDay={'Today At 18:20'}
        taskIconId={'2'}
        priority={'1'}
      />
    </div>
  )
}
