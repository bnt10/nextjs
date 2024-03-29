import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'
import { tempScheduleState } from '@/atoms/tempscheduleAtom'
import {
  ICON_ADD,
  ICON_CALENDAR,
  ICON_CLOCK,
  ICON_HOME,
  ICON_PROFILE,
} from '@/config/icon'
import { useForm } from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import { apiStateSelector } from '@/selectors/apiSelector'
import { createTodoTask } from '@/services/todoList/api'
import type { CreateTodoItemType } from '@/types/todoList'
import { toServerDate } from '@/utils/mapper'

import Button from '../common/Button'
import Loading from '../common/Loading'
import Modal from '../common/Modal'
import TaskButton from '../todo/home/TasskButton'
import { addTaskShcema } from '../todo/modal/constants'
import TaksTitle from '../todo/modal/TaskTitle'
import { textWithIconBtnStyle } from './style/navigationFooter'

export default function Footer() {
  const { openModal, setOpenModal } = useModal()
  const schemduleState = useRecoilValue(tempScheduleState)
  const setSchemduleState = useSetRecoilState(SchemduleState)
  const router = useRouter()

  const footerItem = [
    {
      title: 'index',
      icon: ICON_HOME,
      handler: () => {
        router.push('/todo/home/')
      },
      style: textWithIconBtnStyle,
    },
    {
      title: 'Calendar',
      icon: ICON_CALENDAR,
      handler: async () => {
        router.push('/todo/calendar/')
      },
      style: textWithIconBtnStyle,
    },
    {
      title: '',
      icon: ICON_ADD,
      handler: () => {
        setOpenModal(!openModal)
      },
      style: {
        button:
          'w-64pxr h-64pxr rounded-full bg-primary flex items-center justify-center relative bottom-42pxr',
        icon: 'w-32pxr h-32pxr relative',
      },
    },
    {
      title: 'Focuse',
      icon: ICON_CLOCK,
      handler: () => {},
      style: textWithIconBtnStyle,
    },
    {
      title: 'Profile',
      icon: ICON_PROFILE,
      handler: () => {},
      style: textWithIconBtnStyle,
    },
  ]
  const queryClient = useQueryClient()
  const setApiState = useSetRecoilState(apiStateSelector)
  const { handleOnChange, handleOnSubmit, getFormFields, form } =
    useForm(addTaskShcema)
  const mutation = useMutation(createTodoTask, {
    onSuccess: () => {
      setOpenModal(!openModal)
      setApiState((prev) => ({ ...prev, needDate: true }))
      queryClient.invalidateQueries('todoList')
      setSchemduleState(schemduleState)
    },
  })

  const addTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { title, description } = form
    const { category, date, time, priority } = schemduleState
    const todoTask: CreateTodoItemType = {
      title: title?.value ?? '',
      description: description?.value ?? '',
      isCompleted: false,
      categoryId: category,
      targetDay: toServerDate({ date, time }),
      priority: priority.toString(),
    }

    mutation.mutateAsync(todoTask)
  }

  return (
    <div className="box-border flex h-100pxr w-full  shrink-0 justify-between bg-footer-gray px-20pxr pt-12pxr">
      {footerItem.map(({ title: footerItemTitle, icon, style, handler }) => {
        return (
          <Button
            key={footerItemTitle}
            title={footerItemTitle}
            handler={handler}
            icon={icon}
            style={style}
          />
        )
      })}
      {openModal && (
        <Modal>
          <div className="absolute bottom-[0] h-228pxr w-393pxr flex-col items-center justify-center rounded-t-2xl bg-footer-gray px-25pxr pb-17pxr pt-25pxr">
            <form onSubmit={handleOnSubmit(addTaskSubmit)}>
              <p className="mb-14pxr text-left text-xl font-bold text-white/[0.87]">
                Add Task
              </p>
              <TaksTitle
                handleOnChange={handleOnChange}
                getFormFields={getFormFields}
              />
              <TaskButton />
            </form>
          </div>
          {mutation.isLoading ? <Loading /> : null}
        </Modal>
      )}
    </div>
  )
}
