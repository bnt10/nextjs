import { useEffect } from 'react'

import Input from '@/component/common/Input'
import Modal from '@/component/common/Modal'
import EmptyTodoList from '@/component/todo/home/EmptyTodoList'
import TaskButton from '@/component/todo/home/TasskButton'
import TodoList from '@/component/todo/home/TodoList'
import type { FormSchema } from '@/hooks/type'
import { useForm } from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import HomeLayout from '@/layouts/todo/HomeLayout'
import { addTaskDescription, addTaskInputSt } from '@/styles/todo/home'

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

export default function TodoHome() {
  const { openModal } = useModal()
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
  const isEmptyTodoList = false
  return (
    <>
      <HomeLayout>
        <div className="flex w-full flex-col items-center justify-center">
          {isEmptyTodoList ? <EmptyTodoList /> : <TodoList />}

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
      </HomeLayout>
    </>
  )
}
