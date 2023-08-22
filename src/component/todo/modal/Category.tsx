import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'

import CategoryItem from './CategoryItem'
import ModalActionButtons from './ModalActionButtons'

export default function Category() {
  const [, setModalContent] = useRecoilState(modalContentState)

  const saveHandler = () => {}
  const cancelHandler = () => {
    setModalContent(null)
  }
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className=" w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        <div className="flex items-center justify-center border-b border-[#979797] py-10pxr">
          <span className="text-white">Choose Category</span>
        </div>
        <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
          <CategoryItem icon="FaPlus" />
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
