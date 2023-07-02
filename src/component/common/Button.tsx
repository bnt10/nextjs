import tw from '@/utils/twMergeObjects'

import Icon from './Icon'

type Style = {
  button?: string
  icon?: string
  span?: string
}

type ButtonProps = {
  title: string
  icon?: string
  handler: () => void
  style?: Style
  disabled?: boolean
}

const Button = ({
  title,
  handler,
  style,
  icon,
  disabled = false,
}: ButtonProps) => {
  const twButtonStyles = {
    button: '',
    icon: '',
    span: '',
  }

  const st = tw<Style>(twButtonStyles, style)
  return (
    <button
      type="button"
      disabled={disabled}
      className={st.button}
      onClick={handler}
    >
      {icon && <Icon iconSrc={icon} style={st.icon} />}
      <span className={st.span}>{title}</span>
    </button>
  )
}

export default Button
