import DynamicIcon from '@/component/common/Icon'
import Input from '@/component/common/Input'
import { todoSearchBarSt } from '@/styles/todo/todoSearchBarSt'

interface Props {
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function SearchBar({ handleInputChange }: Props) {
  return (
    <div className="mb-20pxr flex h-48pxr w-full flex-1 rounded border-[0.8px] border-gray-900 bg-black-100 py-12pxr pl-12pxr">
      <div className="mr-12pxr">
        <DynamicIcon color="#979797" iconName={'AiOutlineSearch'} />
      </div>
      <Input
        name="searchBar"
        type="text"
        placeholder="Search for your task..."
        style={todoSearchBarSt}
        handleInputChange={handleInputChange}
      />
    </div>
  )
}
