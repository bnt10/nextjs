import { useState } from 'react'
import type { RecoilState } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { useDynamicRecoilState } from '@/hooks/useDynamicRecoilState'
import { schedulePriorityState } from '@/selectors/prioritySelector'

import ModalHeader from './common/ModalHeader'
import ModalLayout from './common/ModalLayout'
import { MODAL_FOOTER_SAVE_BUTTON, MODAL_HEADER_TITLE } from './constants'
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
    <ModalLayout>
      <ModalHeader title={MODAL_HEADER_TITLE.Priority} />
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
      <ModalActionButtons
        saveTitle={MODAL_FOOTER_SAVE_BUTTON}
        saveHandler={saveHandler}
      />
    </ModalLayout>
  )
}
