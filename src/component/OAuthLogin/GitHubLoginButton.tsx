import { twMerge } from 'tailwind-merge'

import Button from '@/component/common/Button'

interface Props {
  st?: string
  handler: () => void
  title?: string
}

const buttonStyles = {
  button:
    'flex h-48pxr w-full justify-center mb-15pxr relative overflow-hidden rounded bg-tr text-white/[0.87] items-center border-primary border',
  icon: 'relative right-10pxr h-24pxr w-24pxr ',
}

const GithubLoginButton = ({ st, handler, title }: Props) => {
  const containerStyles = twMerge('my-3pxr flex list-none justify-center', st)

  return (
    <li className={containerStyles}>
      <Button
        icon={'/assets/icons/github-login-icon.svg'}
        style={buttonStyles}
        title={title}
        handler={handler}
      />
    </li>
  )
}

export default GithubLoginButton
