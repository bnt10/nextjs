import { twMerge } from 'tailwind-merge'

import Button from '@/component/common/Button'

interface Props {
  st?: string
  handler: () => void
}
const buttonStyles = {
  button:
    'flex h-48pxr w-full justify-center mb-15pxr relative overflow-hidden rounded bg-tr text-white/[0.87] items-center border-primary border',
  icon: 'relative right-10pxr h-24pxr w-24pxr ',
}

const GoogleLoginButton = ({ st, handler }: Props) => {
  const containerStyles = twMerge('my-3pxr flex list-none justify-center', st)

  return (
    <li className={containerStyles}>
      <Button
        icon={'/assets/icons/google-login-Icon.svg'}
        style={buttonStyles}
        title={'Login with Google'}
        handler={handler}
      />
    </li>
  )
}

export default GoogleLoginButton
