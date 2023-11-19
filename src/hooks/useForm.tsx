import type { FormEvent, MutableRefObject } from 'react'
import { createRef, useRef, useState } from 'react'

import type {
  FormFields,
  FormKeys,
  FormRefs,
  FormSchema,
  FormState,
  FormValidateFields,
  SubmitFormData,
} from './type'

type UseInputSchemaReturn<T extends keyof FormKeys> = {
  form: FormState<T>
  formStateRefs: MutableRefObject<Partial<{ [K in T]: FormValidateFields }>>
  isFormValid: boolean
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnSubmit: (
    submit: (
      e: FormEvent<HTMLFormElement>,
      formData: SubmitFormData<T>
    ) => Promise<void>
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
  nextForm: FormState<T>
): boolean => {
  const formValues = Object.values(nextForm) as FormValidateFields[]
  const hasErrors = formValues.some((data) => data && data.error !== null)
  return !hasErrors
}

const getFormData = <T extends keyof FormKeys>(
  form: FormState<T>
): SubmitFormData<T> => {
  const keys = Object.keys(form) as T[]
  const formData = keys.reduce((acc, input: T) => {
    const data = form[input]
    return {
      ...acc,
      [input]: data!.value,
    }
  }, {} as SubmitFormData<T>)
  return formData
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
    const { value, error } = formSchema[input]
    return {
      ...acc,
      [input]: {
        value,
        error,
      },
    }
  }, {})

  const [form, setForm] = useState<FormState<T>>(initForm)
  const formStateRefs = useRef<FormState<T>>(initForm)
  const isFormValid = useRef<boolean>(false)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const errorMessage = formSchema[name as T]?.validate(value, form)

    const changedForm = {
      ...form,
      [name]: { value, error: errorMessage },
    } as FormState<T>
    setForm(changedForm)
    formStateRefs.current = changedForm
    isFormValid.current = checkFormValid(changedForm)
  }
  const getFormFields = () => {
    return generateFormFields(preprocessedFormState)
  }
  const handleOnSubmit =
    (onSubmit: {
      (
        e: FormEvent<HTMLFormElement>,
        formData: SubmitFormData<T>
      ): Promise<void>
    }) =>
    async (formSubmit: FormEvent<HTMLFormElement>) => {
      formSubmit.preventDefault()

      if (isFormValid.current) {
        onSubmit(formSubmit, getFormData(form))
      }
      // Todo inValidate form error handle
    }

  return {
    form,
    formStateRefs,
    handleOnChange,
    isFormValid: isFormValid.current,
    handleOnSubmit,
    getFormFields,
  }
}

export { useForm }
