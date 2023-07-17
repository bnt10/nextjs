import Image from 'next/image'

import Button from '@/component/common/Button'
import Input from '@/component/common/Input'
import Modal from '@/component/common/Modal'
import type { FormSchema } from '@/hooks/type'
import { useForm } from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import HomeLayout from '@/layouts/todo/HomeLayout'
import type { Component } from '@/types/component'

export type FormState = {
  [x: string]: string
}

const addTaskShcema: FormSchema = {
  taskTitle: {
    value: '',
    isControlled: true,
    name: 'taskTitle',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
}

const addTaskSt = {
  input:
    'w-full flex py-8pxr px-16pxr gap-2.5 item-center rounded border border-[#979797] bg-transparent text-white mb-13pxr',
}
const iconBtnSt = {
  button: '',
  icon: 'w-24pxr h-24pxr relative flex-shrink-0',
}

export default function TodoHome() {
  const { openModal } = useModal()
  const { handleOnChange, handleOnSubmit, getFormFields } =
    useForm(addTaskShcema)

  const addTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const fields = getFormFields()

  const TaskWithButton: Record<string, Component> = {
    timer: {
      id: 'timer',
      component: Button,
      props: { style: iconBtnSt, icon: '/assets/images/todo/home/timer.svg' },
      handler: async () => {},
    },
    tag: {
      id: 'tag',
      component: Button,
      props: { style: iconBtnSt, icon: '/assets/images/todo/home/tag.svg' },
      handler: async () => {},
    },
    flag: {
      id: 'flag',
      component: Button,
      props: { style: iconBtnSt, icon: '/assets/images/todo/home/flag.svg' },
      handler: async () => {},
    },
    send: {
      id: 'send',
      component: Button,
      props: {
        style: {
          icon: 'absolute right-26pxr bottom-17pxr w-24pxr h-24pxr flex-shrink-0',
        },
        icon: '/assets/images/todo/home/send.svg',
      },
      handler: async () => {},
    },
  }

  return (
    <>
      <HomeLayout>
        <div className="mt-75pxr flex flex-col items-center justify-center">
          <div className="items-start">
            <Image
              src={'/assets/images/todo/home/index.svg'}
              alt="Image description"
              width={227}
              height={227}
            />
          </div>
          <div className="relative mt-[10pxr]">
            <div className=" text-xl leading-normal  text-white text-opacity-90">
              What do you want to do today?
            </div>
            <div className="mt-10pxr text-center text-base font-normal leading-normal text-white text-opacity-90">
              Tap + to add your tasks
            </div>
          </div>
          {openModal && (
            <Modal>
              <div className="absolute bottom-[0] h-228pxr w-393pxr flex-col items-center justify-center rounded-t-2xl bg-footer-gray px-25pxr pb-17pxr pt-25pxr">
                <form onSubmit={handleOnSubmit(addTaskSubmit)}>
                  <p className="mb-14pxr text-left text-xl font-bold text-white/[0.87]">
                    Add Task
                  </p>

                  <Input
                    value={fields.taskTitle?.value}
                    inputRef={fields.taskTitle?.ref}
                    name={fields.taskTitle?.name as string}
                    handleInputChange={handleOnChange}
                    style={addTaskSt}
                  />
                  <p className="mb-35pxr text-left text-lg text-[#afafaf]">
                    Description
                  </p>
                  <div className="flex w-full justify-between">
                    <div className="flex w-150pxr justify-between">
                      {Object.values(TaskWithButton).map(
                        ({ id, component: Component, props, handler }) => (
                          <Component key={id} {...props} handler={handler} />
                        )
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </HomeLayout>
    </>
  )
}
