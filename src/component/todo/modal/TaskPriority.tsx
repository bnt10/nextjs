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
  getState?: any
  setState?: any
}
export default function TaskPriority({
  stateKey = schedulePriorityState,
  getState,
  setState,
}: TaskPriorityProps) {
  const [priorityState, setPriorityState] = useDynamicRecoilState({
    stateKey,
    getState,
    setState,
  })

  const [priorityId, setPrioirityId] = useState(priorityState)

  const setModalContent = useSetRecoilState(modalContentState)
  const ClickHandler = (proirity: number) => {
    setPrioirityId(proirity)
  }
  const saveHandler = () => {
    setPriorityState(priorityId)
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
                selectedPriority={parseInt(priorityId, 10) === priority}
              />
            )
          )}
        </div>
        <ModalActionButtons saveTitle={'Save'} saveHandler={saveHandler} />
      </div>
    </div>
  )
}
