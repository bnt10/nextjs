import tw from '@/utils/twMergeObjects'

import Icon from './Icon'

type Style = {
  button?: string
  icon?: string
  title?: string
}

type ButtonProps = {
  title: string
  icon?: string
  handler: () => void
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
      {icon && <Icon iconSrc={icon} style={st.icon} />}
      <span className={st.title}>{title}</span>
    </button>
  )
}

export default Button
