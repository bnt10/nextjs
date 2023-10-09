import type { ButtonStyle } from '@/types/style/common'
import tw from '@/utils/twMergeObjects'

import ImageIcon from './ImageIcon'

type ButtonProps = {
  title?: string
  icon?: string
  handler: (value?: any) => void
  style?: ButtonStyle
  disabled?: boolean
  dataType?: string | number
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
  dataType = '',
}: ButtonProps) => {
  const st = tw<ButtonStyle>(twButtonStyles, style)
  return (
    <button
      type="button"
      disabled={disabled}
      className={st.button}
      onClick={handler}
      data-type={`${dataType}`}
    >
      {icon && <ImageIcon iconSrc={icon} style={st.icon} />}
      <span className={st.title}>{title}</span>
    </button>
  )
}

export default Button
