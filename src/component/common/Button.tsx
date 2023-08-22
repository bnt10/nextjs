import tw from '@/utils/twMergeObjects'

import ImageIcon from './ImageIcon'

type Style = {
  button?: string
  icon?: string
  title?: string
}

type ButtonProps = {
  title?: string
  icon?: string
  handler: (value?: any) => void
  style?: Style
  disabled?: boolean
}

const twButtonStyles = {
  button: '',
  icon: '',
  title: '',
}

const Button = ({
  title,
  handler,
  style,
  icon,
  disabled = false,
}: ButtonProps) => {
  const st = tw<Style>(twButtonStyles, style)
  return (
    <button
      type="button"
      disabled={disabled}
      className={st.button}
      onClick={handler}
    >
      {icon && <ImageIcon iconSrc={icon} style={st.icon} />}
      <span className={st.title}>{title}</span>
    </button>
  )
}

export default Button
