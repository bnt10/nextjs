import { useState } from 'react'

import type { FormError } from '@/hooks/type'
import type { InputStyle } from '@/types/style/common'
import tw from '@/utils/twMergeObjects'

interface InputProps {
  value?: string
  style?: InputStyle
  name: string
  disabled?: boolean
  placeholder?: string
  type: string
  label?: string
  validatePlaceholder?: string[]
  inputRef?: React.RefObject<HTMLInputElement>
  invalidMessage?: FormError
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  handleInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const twInputStyles = {
  wrapper: 'w-full flex flex-col',
  input: '',
  label: 'font-normal text-base text-white/[0.87] mb-8pxr',
  invalidMessage: 'text-red-500 text-sm h-15pxr',
}

const Input = ({
  value = '',
  disabled = false,
  style,
  name,
  inputRef,
  placeholder,
  label,
  invalidMessage,
  validatePlaceholder,
  type = 'text',
  handleInputFocus,
  handleInputChange,
  handleInputBlur,
}: InputProps) => {
  const st = tw<InputStyle>(twInputStyles, style)
  const [isFocused, setIsFocused] = useState(false)

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    handleInputFocus?.(event)
  }
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    handleInputBlur?.(event)
  }
  return (
    <div className={st.wrapper}>
      {label && (
        <label className={st.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        className={st.input}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
      />

      {isFocused && validatePlaceholder && (
        <div className="mt-3pxr">
          {validatePlaceholder?.map((item, index) => (
            <div className="text-sm text-gray-900" key={index}>
              {item}
            </div>
          ))}
        </div>
      )}

      <span className={st.invalidMessage}>{invalidMessage}</span>
    </div>
  )
}

export default Input
