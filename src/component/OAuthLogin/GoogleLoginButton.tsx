import { twMerge } from 'tailwind-merge'

import Button from '@/component/common/Button'

interface Props {
  st?: string
}
const buttonStyles = {
  button:
    'mb-15pxr flex relative overflow-hidden rounded-2xl bg-[#153e6d] text-white items-center justify-center',
}

const GoogleLoginButton = ({ st }: Props) => {
  const handler = () => {
    alert('as')
  }
  const containerStyles = twMerge('my-3pxr flex list-none justify-center', st)

  return (
    <li className={containerStyles}>
      <Button
        icon={'/assets/icons/google-login-Icon.svg'}
        style={buttonStyles}
        title={'Google Login'}
        handler={handler}
      />
    </li>
  )
}

export default GoogleLoginButton
