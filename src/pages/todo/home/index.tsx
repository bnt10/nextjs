import Image from 'next/image'
import { useRef } from 'react'

import Input from '@/component/common/Input'
import Modal from '@/component/common/Modal'
import type { FormSchema } from '@/hooks/type'
import { useForm } from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import HomeLayout from '@/layouts/todo/HomeLayout'

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
export default function TodoHome() {
  const { openModal } = useModal()
  const { form, handleOnChange, handleOnSubmit, registerRzef, getForm } =
    useForm(addTaskShcema)


  const addTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
              <form onSubmit={handleOnSubmit(addTaskSubmit)}>
                <div className="absolute bottom-[0] h-228pxr w-393pxr flex-col items-center justify-center rounded-t-2xl bg-footer-gray">
                  <p className="text-left text-xl font-bold text-white/[0.87]">
                    Add Task
                  </p>

                  <Input
                    inputRef={registerRef('taskTitle')}
                    value={form.taskTitle?.value}
                    name={addTaskShcema.taskTitle?.name as string}
                  />
                  <p className="text-left text-lg text-[#afafaf]">
                    {/* {form.taskTitle?.value} */}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const a = getForm()
                      console.log(a.current?.ref?.current?.value)
                
                    }}
                  >
                    dd
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </HomeLayout>
    </>
  )
}
