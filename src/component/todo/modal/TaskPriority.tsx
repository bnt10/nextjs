import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { schedulePriorityState } from '@/selectors/prioritySelector'

import ModalActionButtons from './ModalActionButtons'
import TaskPriorityItem from './TaskPriorityItem'

const PRIORITY_LEVEL = 9
export default function TaskPriority() {
  const [priorityState, setPriorityState] = useRecoilState(
    schedulePriorityState
  )
  const [selectedButton, setSelectedButton] = useState<number>(priorityState)
  const [, setModalContent] = useRecoilState(modalContentState)
  const ClickHandler = (proirity: number) => {
    setSelectedButton(proirity)
  }
  const saveHandler = () => {
    setPriorityState(selectedButton)
    setModalContent(null)
  }
  const cancelHandler = () => {
    setModalContent(null)
  }
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className=" w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        <div className="flex items-center justify-center border-b border-[#979797] py-10pxr">
          <span className="text-white">Task Proirity</span>
        </div>
        <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
          {Array.from({ length: PRIORITY_LEVEL }, (_, index) => index + 1).map(
            (priority) => (
              <TaskPriorityItem
                key={priority}
                title={`${priority}`}
                onClick={ClickHandler}
                selectedPriority={selectedButton === priority}
              />
            )
          )}
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
