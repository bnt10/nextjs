import Button from '@/component/common/Button'

const GoogleLoginButton = () => {
  const handler = () => {}
  return (
    <li className="flex list-none justify-center">
      <Button
        className={'text-center '}
        title={'Google Login'}
        handler={handler}
      />
    </li>
  )
}

export default GoogleLoginButton
