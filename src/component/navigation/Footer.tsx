import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
  ICON_ADD,
  ICON_CALENDAR,
  ICON_CLOCK,
  ICON_HOME,
  ICON_PROFILE,
} from '@/config/icon'
import type { FormSchema } from '@/hooks/type'
import { useForm } from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import { addTaskDescription, addTaskInputSt } from '@/styles/todo/home'

import Button from '../common/Button'
import Input from '../common/Input'
import Modal from '../common/Modal'
import TaskButton from '../todo/home/TasskButton'

type TaskFormElements = 'title' | 'description'

const addTaskShcema: FormSchema<TaskFormElements> = {
  title: {
    value: '',
    type: 'text',
    isControlled: true,
    name: 'title',
    placeholder: 'title',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
  description: {
    value: '',
    type: 'text',
    isControlled: true,
    name: 'description',
    placeholder: 'description',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
}
export default function Footer() {
  const { openModal, setOpenModal } = useModal()
  const router = useRouter()

  const textWithIconBtnStyle = {
    button:
      'flex ml-20 w-48pxr h-50pxr flex-col align-middle justify-center items-center',
    icon: 'relative w-24pxr, h-24pxr',
    title: 'mt-10pxr text-xs text-white',
  }
  const footerItem = [
    {
      title: 'index',
      icon: ICON_HOME,
      handler: () => {},
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
  const { handleOnChange, handleOnSubmit, getFormFields } =
    useForm(addTaskShcema)

  const addTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const { title, description } = getFormFields()

  useEffect(() => {
    if (openModal) {
      title.ref?.current?.focus()
    }
  }, [openModal])

  return (
    <div className="absolute bottom-0pxr box-border flex h-100pxr  w-full justify-between bg-footer-gray px-20pxr pt-12pxr">
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

              <Input
                type={title.type}
                value={title.value}
                inputRef={title.ref}
                name={title.name}
                placeholder={title.placeholder}
                handleInputChange={handleOnChange}
                style={addTaskInputSt}
              />
              <Input
                type={description.type}
                value={description.value}
                inputRef={description.ref}
                name={description.name}
                placeholder={description.placeholder}
                handleInputChange={handleOnChange}
                style={addTaskDescription}
              />

              <TaskButton />
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
