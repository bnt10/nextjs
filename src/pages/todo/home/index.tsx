import Image from 'next/image'
import { useEffect } from 'react'

import Input from '@/component/common/Input'
import Modal from '@/component/common/Modal'
import TaskButton from '@/component/todo/home/TasskButton'
import type { FormSchema } from '@/hooks/type'
import { useForm } from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import HomeLayout from '@/layouts/todo/HomeLayout'
import { addTaskSt } from '@/styles/todo/home'

type TaskFormElements = 'taskTitle'

const addTaskShcema: FormSchema<TaskFormElements> = {
  taskTitle: {
    value: '',
    type: 'text',
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

export default function TodoHome() {
  const { openModal } = useModal()
  const { handleOnChange, handleOnSubmit, getFormFields } =
    useForm(addTaskShcema)

  const addTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const fields = getFormFields()

  useEffect(() => {
    if (openModal) {
      fields.taskTitle.ref?.current?.focus()
    }
  }, [openModal])

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
                    value={fields.taskTitle.value}
                    inputRef={fields.taskTitle.ref}
                    name={fields.taskTitle.name as string}
                    handleInputChange={handleOnChange}
                    style={addTaskSt}
                  />
                  <p className="mb-35pxr text-left text-lg text-[#afafaf]">
                    Description
                  </p>
                  <TaskButton />
                </form>
              </div>
            </Modal>
          )}
        </div>
      </HomeLayout>
    </>
  )
}
