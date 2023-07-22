import { twMerge } from 'tailwind-merge'

import Button from '@/component/common/Button'

interface Props {
  st?: string
  handler: () => void
}

const buttonStyles = {
  button:
    'flex h-48pxr w-314pxr bg-gray-900 justify-center mb-15pxr flex relative overflow-hidden rounded-2xl bg-[#dddede] text-neutral-900 items-center',
  icon: 'left-24pxr top-10pxr h-30pxr w-30pxr ',
}

const GithubLoginButton = ({ st, handler }: Props) => {
  const containerStyles = twMerge('my-3pxr flex list-none justify-center', st)

  return (
    <li className={containerStyles}>
      <Button
        icon={'/assets/icons/github-login-icon.svg'}
        style={buttonStyles}
        title={'Github Login'}
        handler={handler}
      />
    </li>
  )
}

export default GithubLoginButton
