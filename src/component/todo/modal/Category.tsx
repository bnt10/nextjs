import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { CategoryList } from '@/config/category'
import { scheduleCategoryState } from '@/selectors/category'

import CategoryItem from './CategoryItem'
import ModalActionButtons from './ModalActionButtons'

export default function Category() {
  const [, setModalContent] = useRecoilState(modalContentState)
  const [categoryState, setCategoryState] = useRecoilState(
    scheduleCategoryState
  )
  const saveHandler = () => {
    setModalContent(null)
  }
  const cancelHandler = () => {
    setModalContent(null)
  }
  const onCategoryClickHandler = (id: string) => {
    setCategoryState(id)
  }
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className=" w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        <div className="flex items-center justify-center border-b border-gray-900 py-10pxr">
          <span className="text-white">Choose Category</span>
        </div>
        <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
          {CategoryList.map(({ id, icon, title, color }) => (
            <CategoryItem
              id={id}
              key={id}
              onCategoryClickHandler={onCategoryClickHandler}
              selected={categoryState === id}
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
