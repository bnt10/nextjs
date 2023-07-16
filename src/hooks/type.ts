import type { RefObject } from 'react'

export const INPUT_TYPE = {
  TEXT: 'text',
  PAWSSWORD: 'password',
} as const

export type FormError = string | null | undefined

export type FormState = {
  [name: string]: {
    value: string
    error: FormError
  }
}

export type FormSchema = {
  [x: string]: {
    value: string
    error?: FormError
    isControlled?: boolean
    ref?: RefObject<HTMLInputElement>
    name: string
    validate: (value: string, formState?: FormState | undefined) => FormError
    onChange?: () => void
  }
}
export type FormFieldValue = {
  value: string
  ref?: RefObject<HTMLInputElement>
  name: string
  onChange?: () => void
}

export type FormFields = {
  [x: string]: FormFieldValue
}

export type ResponseError = {
  details: string
}

export type FormRefs = {
  [key: string]: React.RefObject<any>
}
