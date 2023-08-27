import type { RefObject } from 'react'

export const INPUT_TYPE = {
  TEXT: 'text',
  PAWSSWORD: 'password',
} as const

export type FormError = string | null | undefined
export type FormKeys = string | number | symbol | any
export type FormValidateFields = {
  value: string
  error: FormError
}

export type FormState<T extends keyof FormKeys> = Partial<{
  [K in T]: FormValidateFields
}>

export type FormSchema<T extends keyof FormKeys> = {
  [K in T]: {
    value: string
    error?: FormError
    isControlled?: boolean
    ref?: RefObject<HTMLInputElement>
    name: string
    type: string
    placeholder?: string
    validate: (value: string, formState?: FormState<T> | undefined) => FormError
    onChange?: () => void
  }
}
export type FormFieldValue = {
  value: string
  ref?: RefObject<HTMLInputElement>
  name: string
  placeholder?: string
  type: string
  onChange?: () => void
}

export type FormFields<T extends keyof FormKeys> = {
  [K in T]: FormFieldValue
}

export type ResponseError = {
  details: string
}

export type FormRefs<T extends keyof FormKeys> = Partial<{
  [K in T]: React.RefObject<any>
}>
