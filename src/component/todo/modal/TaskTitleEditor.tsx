import type { RecoilState } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import Button from '@/component/common/Button'
import { useDynamicRecoilState } from '@/hooks/useDynamicRecoilState'
import { useForm } from '@/hooks/useForm'
import { schedulePriorityState } from '@/selectors/prioritySelector'
import { modalCancelButtonSt } from '@/styles/todo/modal/button'

import ModalHeader from './common/ModalHeader'
import ModalLayout from './common/ModalLayout'
import type { TaskFormElements } from './constants'
import {
  addTaskSchema,
  MODAL_FOOTER_SAVE_BUTTON,
  MODAL_HEADER_TITLE,
} from './constants'
import TaskTitle from './TaskTitle'

type TaskPriorityProps = {
  stateKey?: RecoilState<any>
  getState?: any
  setState?: any
}
type TaskTitleType = Record<string, any>

export default function TaskTitleEditor({
  stateKey = schedulePriorityState,
  getState,
  setState,
}: TaskPriorityProps) {
  const [taskTitle, setTaskTitle] = useDynamicRecoilState({
    stateKey,
    getState,
    setState,
  })

  const formattedObject = Object.keys(taskTitle).reduce(
    (acc: TaskTitleType, key: string) => {
      acc[key] = { value: taskTitle[key] }
      return acc
    },
    {}
  )

  const setModalContent = useSetRecoilState(modalContentState)

  const combimeObject = Object.keys(addTaskSchema).reduce(
    (acc, inputElement) => {
      const { value } = formattedObject[inputElement]
      return {
        ...acc,
        [inputElement]: {
          ...addTaskSchema[inputElement as TaskFormElements],
          value,
        },
      }
    },
    {}
  )

  const { handleOnChange, handleOnSubmit, getFormFields, form } =
    useForm(combimeObject)

  const addTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTaskTitle(form)
    setModalContent(null)
  }
  return (
    <ModalLayout>
      <ModalHeader title={MODAL_HEADER_TITLE.Task} />
      <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
        <form className="w-full" onSubmit={handleOnSubmit(addTaskSubmit)}>
          <TaskTitle
            handleOnChange={handleOnChange}
            getFormFields={getFormFields}
          />
          <div className="flex items-center justify-center px-8pxr pb-8pxr">
            <Button
              title={MODAL_FOOTER_SAVE_BUTTON}
              buttonType="submit"
              style={modalCancelButtonSt}
            />
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}
