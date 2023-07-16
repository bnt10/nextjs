import tw from '@/utils/twMergeObjects'

interface InputProps {
  value?: string
  style?: Style
  name: string
  disabled?: boolean
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputRef?: React.RefObject<HTMLInputElement>
}
type Style = {
  wrapper?: string
  input?: string
}

const twInputStyles = {
  wrapper: 'flex w-325pxr, py-8xpr px-16pxr gep-10pxr',
  input: '',
}

const Input = ({
  value = '',
  disabled = false,
  style,
  name,
  inputRef,
  handleInputChange,
}: InputProps) => {
  const st = tw<Style>(twInputStyles, style)

  return (
    <div className={st.wrapper}>
      <input
        ref={inputRef}
        className={st.input}
        onChange={handleInputChange}
        name={name}
        disabled={disabled}
        type="text"
        defaultValue={value}
      />
    </div>
  )
}

export default Input
