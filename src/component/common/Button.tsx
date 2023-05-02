type ButtonProps = {
  title: string
  handler: () => void
  className?: string
}

const Button = ({ title, handler, className }: ButtonProps) => {
  return (
    <button
      className={className || `flex  h-48pxr w-314pxr bg-gray-900 `}
      onClick={handler}
    >
      <span>{title || 'Button'}</span>
    </button>
  )
}

export default Button
