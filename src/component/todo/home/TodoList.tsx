import SortButton from './SortButton'
import TodoSearchBar from './TodoSearchBar'

export default function TodoList() {
  return (
    <div className="mt-16pxr flex w-full flex-col px-24pxr">
      <TodoSearchBar />
      <SortButton title={'Today'} />
    </div>
  )
}
