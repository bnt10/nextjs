import { useEffect } from 'react'

import Input from '@/component/common/Input'
import useModal from '@/hooks/useModal'
import { addTaskDescription, addTaskInputSt } from '@/styles/todo/home'

interface Props {
  handleOnChange: any
  getFormFields: any
}
export default function TaksTitle({ handleOnChange, getFormFields }: Props) {
  const { title, description } = getFormFields()
  const { openModal } = useModal()
  useEffect(() => {
    if (openModal) {
      title.ref?.current?.focus()
    }
  }, [openModal])

  return (
    <section className="w-full">
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
    </section>
  )
}
