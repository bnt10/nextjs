import { LoginOAuth } from '@/constants/loginOAuth'

const AuthLogin = () => {
  return (
    <div>
      {Object.values(LoginOAuth).map(({ id, component: OAuthLoginButton }) => (
        <OAuthLoginButton key={id} />
      ))}
    </div>
  )
}

export default AuthLogin
