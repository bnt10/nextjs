import type {
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
} from 'react'
import { createRef, useEffect, useRef, useState } from 'react'

import type {
  FormFields,
  FormKeys,
  FormRefs,
  FormSchema,
  FormState,
  FormValidateFields,
} from './type'

type UseInputSchemaReturn<T extends keyof FormKeys> = {
  form: FormState<T>
  formStateRefs: MutableRefObject<Partial<{ [K in T]: FormValidateFields }>>
  isFormValid: boolean
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnSubmit: (
    submit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>

  getFormFields: () => FormFields<T>
}

const generateFormFields = <T extends keyof FormKeys>(
  formSchema: FormSchema<T>
): FormFields<T> => {
  const formFields = {} as FormFields<T>
  const keys = Object.keys(formSchema) as T[]

  keys.forEach((key) => {
    formFields[key] = { ...formSchema[key] }
  })

  return formFields
}
const initializeFormRefs = <T extends keyof FormKeys>(
  formState: FormSchema<T>,
  formRefs: React.MutableRefObject<FormRefs<T>>
): void => {
  const keys = Object.keys(formState) as T[]

  keys.forEach((input) => {
    if (formState[input]?.isControlled && !formRefs.current[input]) {
      // eslint-disable-next-line no-param-reassign
      formRefs.current[input] = createRef()
    }
  })
}

const generateInitFormState = <T extends keyof FormKeys>(
  formState: FormSchema<T>,
  formRefs: React.MutableRefObject<FormRefs<T>>
): FormSchema<T> => {
  return (Object.keys(formState) as T[]).reduce<FormSchema<T>>((acc, input) => {
    return {
      ...acc,
      [input]: {
        ...(formState[input] || {}),
        ref: formState[input]?.isControlled ? formRefs.current[input] : null,
      },
    }
  }, {} as FormSchema<T>)
}
const checkFormValid = <T extends keyof FormKeys>(
  nextForm: FormState<T>,
  updateFormVaild: Dispatch<SetStateAction<boolean>>
): void => {
  const formValues = Object.values(nextForm) as FormValidateFields[]
  const hasErrors = formValues.some((data) => data && data.error !== null)
  updateFormVaild(!hasErrors)
}

const useForm = <T extends keyof FormKeys>(
  formSchema: FormSchema<T>,
  options?: FormSchema<T>
): UseInputSchemaReturn<T> => {
  const formRefs = useRef<FormRefs<T>>({})
  const initFormState = { ...formSchema, ...options }
  initializeFormRefs(initFormState, formRefs)
  const preprocessedFormState = generateInitFormState(initFormState, formRefs)
  const keys = Object.keys(preprocessedFormState) as T[]
  const initForm = keys.reduce<FormState<T>>((acc, input: T) => {
    const { value, validate } = formSchema[input]
    return {
      ...acc,
      [input]: {
        value,
        error: validate(value), // todo optional state check
      },
    }
  }, {})

  const [form, setForm] = useState<FormState<T>>(initForm)
  const formStateRefs = useRef<FormState<T>>(initForm)
  const [isFormValid, setIsFormValid] = useState(true)

  useEffect(() => {
    checkFormValid(form, setIsFormValid)
  }, [])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const errorMessage = formSchema[name as T]?.validate(value, form)

    const changedForm = {
      ...form,
      [name]: { value, error: errorMessage },
    } as FormState<T>
    setForm(changedForm)
    formStateRefs.current = changedForm
    checkFormValid(changedForm, setIsFormValid)
  }
  const getFormFields = () => {
    return generateFormFields(preprocessedFormState)
  }
  const handleOnSubmit =
    (onSubmit: { (e: FormEvent<HTMLFormElement>): Promise<void> }) =>
    async (formSubmit: FormEvent<HTMLFormElement>) => {
      formSubmit.preventDefault()

      if (isFormValid) {
        onSubmit(formSubmit)
      }
      // Todo inValidate form error handle
    }

  return {
    form,
    formStateRefs,
    handleOnChange,
    isFormValid,
    handleOnSubmit,
    getFormFields,
  }
}

export { useForm }
