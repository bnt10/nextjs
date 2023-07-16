import type { FormEvent } from 'react'
import { createRef, useRef, useState } from 'react'

import type {
  FormFields,
  FormFieldValue,
  FormRefs,
  FormSchema,
  FormState,
} from './type'

type UseInputSchemaReturn = {
  form: FormState
  isFormValid: boolean
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnSubmit: (
    submit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>

  getFormFields: () => FormFields
}

const generateFormFields = (formSchema: FormSchema): FormFields => {
  const formFields = {} as FormFields

  Object.keys(formSchema).forEach((key) => {
    const { name, value, ref, onChange } = formSchema[key] as FormFieldValue

    formFields[key] = { name, value, ref, onChange }
  })

  return formFields
}
const initializeFormRefs = (
  formState: FormSchema,
  formRefs: React.MutableRefObject<FormRefs>
): void => {
  Object.keys(formState).forEach((input) => {
    if (formState[input]?.isControlled && !formRefs.current[input]) {
      // eslint-disable-next-line no-param-reassign
      formRefs.current[input] = createRef()
    }
  })
}

const generateInitFormState = (
  formState: FormSchema,
  formRefs: React.MutableRefObject<FormRefs>
): FormSchema => {
  return Object.keys(formState).reduce((acc, input) => {
    return {
      ...acc,
      [input]: {
        ...(formState[input] || {}),
        ref: formState[input]?.isControlled ? formRefs.current[input] : null,
      },
    }
  }, {})
}

const useForm = (
  formSchema: FormSchema,
  options?: FormSchema
): UseInputSchemaReturn => {
  const formRefs = useRef<FormRefs>({})
  const initFormState = { ...formSchema, ...options }
  initializeFormRefs(initFormState, formRefs)
  const preprocessedFormState = generateInitFormState(initFormState, formRefs)

  const initForm = Object.keys(preprocessedFormState).reduce((acc, input) => {
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
  const getFormFields = () => {
    return generateFormFields(preprocessedFormState)
  }
  const handleOnSubmit =
    (onSubmit: { (e: FormEvent<HTMLFormElement>): Promise<void> }) =>
    async (formSubmit: FormEvent<HTMLFormElement>) => {
      if (isFormValid) {
        formSubmit.preventDefault()
        // const uncontrolledValues = Object.entries(formSchema)
        //   .filter(([_, schema]) => schema.isControlled)
        //   .reduce(
        //     (values: Record<string, string | undefined>, [key, schema]) => {
        //       return {
        //         ...values,
        //         [key]: schema.ref?.current?.value,
        //       }
        //     },
        //     {}
        //   )
        // const finalFormValues = { ...form, ...uncontrolledValues }

        onSubmit(formSubmit)
      }
      // Todo inValidate form error handle
    }

  return {
    form,
    handleOnChange,
    isFormValid,
    handleOnSubmit,

    getFormFields,
  }
}

export { useForm }
