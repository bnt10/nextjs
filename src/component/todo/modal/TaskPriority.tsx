import { useState } from 'react'
import type { RecoilState } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { useDynamicRecoilState } from '@/hooks/useDynamicRecoilState'
import { schedulePriorityState } from '@/selectors/prioritySelector'

import ModalActionButtons from './ModalActionButtons'
import TaskPriorityItem from './TaskPriorityItem'

const PRIORITY_LEVEL = 9

type TaskPriorityProps = {
  stateKey?: RecoilState<any>
  extraMethod?: any
}
export default function TaskPriority({
  stateKey = schedulePriorityState,
  extraMethod,
}: TaskPriorityProps) {
  const [priorityState, setPriorityState] = useDynamicRecoilState({
    stateKey,
    func: extraMethod,
  })
  console.log(priorityState)
  const [selectedButton, setSelectedButton] = useState(priorityState)

  const setModalContent = useSetRecoilState(modalContentState)
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
        <div className="flex items-center justify-center border-b border-gray-900 py-10pxr">
          <span className="text-white">Task Proirity</span>
        </div>
        <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
          {Array.from({ length: PRIORITY_LEVEL }, (_, index) => index + 1).map(
            (priority) => (
              <TaskPriorityItem
                key={priority}
                title={`${priority}`}
                onClick={ClickHandler}
                selectedPriority={parseInt(selectedButton, 10) === priority}
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
