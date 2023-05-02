import Image from 'next/image'

import logoBg from '@/public/assets/images/app-login-bg.png'
import type { ProviderConfig } from '@/types/oauthProvider'

import HText from '../common/HText'
import GitHubLoginButton from './GitHubLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

const AuthLogin = () => {
  const LoginOAuth: Record<string, ProviderConfig> = {
    google: {
      id: 'googleLogin',
      component: GoogleLoginButton,
    },
    github: {
      id: 'githubLogin',
      component: GitHubLoginButton,
    },
  }

  return (
    <>
      <div>
        <Image
          src={logoBg}
          alt="login-bg"
          className="absolute top-0pxr -z-10 h-full w-full bg-gray-900 object-cover"
        />
        <HText level={1} text={'wellcome to'} />
        <div>
          {Object.values(LoginOAuth).map(
            ({ id, component: OAuthLoginButton }) => (
              <OAuthLoginButton key={id} />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default AuthLogin
