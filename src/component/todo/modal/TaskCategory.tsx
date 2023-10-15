import { useState } from 'react'
import type { RecoilState } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { CategoryList } from '@/config/category'
import { useDynamicRecoilState } from '@/hooks/useDynamicRecoilState'
import { schedulePriorityState } from '@/selectors/prioritySelector'

import CategoryItem from './CategoryItem'
import ModalLayout from './common/ModalLayout'
import ModalActionButtons from './ModalActionButtons'

interface TaskCategoryProps {
  stateKey?: RecoilState<any>
  getState?: any
  setState?: any
}
export default function TaskCategory({
  stateKey = schedulePriorityState,
  getState,
  setState,
}: TaskCategoryProps) {
  const setModalContent = useSetRecoilState(modalContentState)

  const [categoryState, setCategoryState] = useDynamicRecoilState({
    stateKey,
    getState,
    setState,
  })
  const [categoryId, setCategoryId] = useState(categoryState)
  const saveHandler = () => {
    setCategoryState(categoryId)
    setModalContent(null)
  }

  const onCategoryClickHandler = (id: string) => {
    setCategoryId(id)
  }

  return (
    <ModalLayout>
      <div className="flex items-center justify-center border-b border-gray-900 py-10pxr">
        <span className="text-white">Choose Category</span>
      </div>
      <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
        {CategoryList.map(({ id, icon, title, color }) => (
          <CategoryItem
            id={id}
            key={id}
            onCategoryClickHandler={onCategoryClickHandler}
            selected={categoryId === id}
            icon={icon}
            title={title}
            color={color}
          />
        ))}
      </div>
      <ModalActionButtons saveTitle={'Save'} saveHandler={saveHandler} />
    </ModalLayout>
  )
}
