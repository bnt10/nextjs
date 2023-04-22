type ButtonPropsWithChildren = ButtonProps & { children?: React.ReactNode }

type ButtonProps = {
  title: string
  handler: () => void
  wrapper?: (props: ButtonPropsWithChildren) => React.ReactElement
}

const DefaultButton = ({ title, handler }: ButtonProps) => {
  return (
    <button onClick={handler}>
      <span>{title || 'Button'}</span>
    </button>
  )
}

const Button = ({ title, wrapper, handler }: ButtonProps) => {
  const buttonElement = <DefaultButton title={title} handler={handler} />
  return wrapper
    ? wrapper({ title, handler, children: buttonElement })
    : buttonElement
}

export default Button
