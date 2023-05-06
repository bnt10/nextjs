import { twMerge } from 'tailwind-merge'

import Button from '@/component/common/Button'

interface Props {
  st?: string
}

const buttonStyles = {
  button:
    'flex relative overflow-hidden rounded-2xl bg-[#dddede] text-neutral-900 items-center justify-center',
}

const GithubLoginButton = ({ st }: Props) => {
  const handler = () => {
    alert('as')
  }
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
