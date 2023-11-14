import tw from '@/utils/twMergeObjects'

interface InputProps {
  value?: string
  style?: Style
  name: string
  disabled?: boolean
  placeholder?: string
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputRef?: React.RefObject<HTMLInputElement>
  type: string
  label?: string
}
type Style = {
  wrapper?: string
  input?: string
  label?: string
}

const twInputStyles = {
  wrapper: 'w-full flex flex-col',
  input: '',
  label: 'font-normal text-base text-white/[87] mb-8pxr',
}

const Input = ({
  value = '',
  disabled = false,
  style,
  name,
  inputRef,
  placeholder,
  label,
  type = 'text',
  handleInputChange,
}: InputProps) => {
  const st = tw<Style>(twInputStyles, style)

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
        name={name}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  )
}

export default Input
