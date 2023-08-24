import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import type { IconKeys } from '@/component/common/Icon'
import { scheduleCategoryState } from '@/selectors/category'

import CategoryItem from './CategoryItem'
import ModalActionButtons from './ModalActionButtons'

type CategoryListType = {
  id: string
  title: string
  icon: IconKeys
  color: string
}
const CategoryList: CategoryListType[] = [
  { id: '1', title: 'Grocery', icon: 'FaBreadSlice', color: '#CCFF80' },
  { id: '2', title: 'Work', icon: 'FaBriefcase', color: '#FF9680' },
  { id: '3', title: 'Sport', icon: 'FaWalking', color: '#80FFFF' },
  { id: '4', title: 'Design', icon: 'FaPaintBrush', color: '#80FFD9' },
  {
    id: '5',
    title: 'University',
    icon: 'FaGraduationCap',
    color: '#809CFF',
  },
  { id: '6', title: 'Social', icon: 'FaUserPlus', color: '#FF80EB' },
  { id: '7', title: 'Music', icon: 'FaMusic', color: '#FC80FF' },
  { id: '8', title: 'Health', icon: 'FaHeartbeat', color: '#80FFA3' },
  { id: '9', title: 'Movie', icon: 'FaVideo', color: '#80D1FF' },
  { id: '10', title: 'Home', icon: 'FaHome', color: '#FFCC80' },
]

export default function Category() {
  const [, setModalContent] = useRecoilState(modalContentState)
  const [, setCategoryState] = useRecoilState(scheduleCategoryState)
  const saveHandler = () => {}
  const cancelHandler = () => {
    setModalContent(null)
  }
  const onCategoryClickHandler = (id: string) => {
    setCategoryState(id)
  }
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className=" w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        <div className="flex items-center justify-center border-b border-[#979797] py-10pxr">
          <span className="text-white">Choose Category</span>
        </div>
        <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
          {CategoryList.map(({ id, icon, title, color }) => (
            <CategoryItem
              key={id}
              id={id}
              onCategoryClickHandler={onCategoryClickHandler}
              icon={icon}
              title={title}
              color={color}
            />
          ))}
        </div>
        <ModalActionButtons
          saveTitle={'Save'}
          saveHandler={saveHandler}
          cancelTitle={'Cancel'}
          cancelHandler={cancelHandler}
        />
      </div>
    </div>
  )
}
