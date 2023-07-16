import type { FormEvent } from 'react'
import { useRef, useState } from 'react'

import type { FormSchema, FormState } from './type'

type UseInputSchemaReturn = {
  form: FormState
  isFormValid: boolean
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnSubmit: (
    submit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>
  registerRef: (name: string) => React.RefObject<HTMLInputElement>
  getForm: () => FormSchema
}

const RegisterRef = (formSchema: FormSchema, name: string) => {
  const ref = useRef()

  return (formSchema[name] = {
    ...formSchema[name],
    ref,
  })
}

const useForm = (formSchema: FormSchema): UseInputSchemaReturn => {
  const initForm = Object.keys(formSchema).reduce((acc, input) => {
    return {
      ...acc,
      [input]: {
        value: formSchema[input]?.value,
        error: formSchema[input]?.error,
      },
    }
  }, {})

  const [form, setForm] = useState<FormState>(initForm)
  const [isFormValid, setIsFormValid] = useState(false)

  const checkFormValid = (nextForm: FormState): void => {
    const formValues = Object.values(nextForm)
    const hasErrors = formValues.some((data) => data.error !== null)
    setIsFormValid(!hasErrors)
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const errorMessage = formSchema[name]?.validate(value, form)

    const changedForm = {
      ...form,
      [name]: { value, error: errorMessage },
    }

    setForm(changedForm)
    checkFormValid(changedForm)
  }
  const getForm = () => {
    return formSchema
  }
  const handleOnSubmit =
    (onSubmit: { (e: FormEvent<HTMLFormElement>): Promise<void> }) =>
    async (formSubmit: FormEvent<HTMLFormElement>) => {
      if (isFormValid) {
        formSubmit.preventDefault()
        const uncontrolledValues = Object.entries(formSchema)
          .filter(([_, schema]) => schema.isControlled)
          .reduce(
            (values: Record<string, string | undefined>, [key, schema]) => {
              return {
                ...values,
                [key]: schema.ref?.current?.value,
              }
            },
            {}
          )
        const finalFormValues = { ...form, ...uncontrolledValues }
        console.log(finalFormValues)

        onSubmit(formSubmit)
      }
      // Todo inValidate form error handle
    }

  return {
    form,
    handleOnChange,
    isFormValid,
    handleOnSubmit,

    getForm,
  }
}

export { useForm }
