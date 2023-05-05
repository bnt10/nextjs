import Button from '@/component/common/Button'
import GoogleLoginIcon from '@/public/assets/icons/google-login-Icon.svg'

const GoogleLoginButton = () => {
  const handler = () => {}
  return (
    <li className="flex list-none justify-center">
      <GoogleLoginIcon className="absolute left-7pxr top-5pxr h-30pxr w-30pxr object-cover" />
      <Button
        className={'text-center '}
        title={'Google Login'}
        handler={handler}
      />
    </li>
  )
}

export default GoogleLoginButton
