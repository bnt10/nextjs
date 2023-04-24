import { LoginOAuth } from '@/constants/loginOAuth'

const Index = () => {
  return (
    <ul>
      {Object.values(LoginOAuth).map(({ id, component: OAuthLoginButton }) => (
        <OAuthLoginButton key={id} />
      ))}
    </ul>
  )
}

export default Index
