import tw from '@/utils/twMergeObjects'

interface InputProps {
  value?: string
  style?: Style
  name: string
  disabled?: boolean
  placeholder?: string
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputRef?: React.RefObject<HTMLInputElement>
}
type Style = {
  wrapper?: string
  input?: string
}

const twInputStyles = {
  wrapper: 'w-full',
  input: '',
}

const Input = ({
  value = '',
  disabled = false,
  style,
  name,
  inputRef,
  placeholder,
  handleInputChange,
}: InputProps) => {
  const st = tw<Style>(twInputStyles, style)
  console.log(placeholder)
  return (
    <div className={st.wrapper}>
      <input
        ref={inputRef}
        className={st.input}
        onChange={handleInputChange}
        name={name}
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  )
}

export default Input
