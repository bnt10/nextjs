import Image from 'next/image'
import { signIn } from 'next-auth/react'

import logoBg from '@/public/assets/images/app-login-bg.png'
import type { ProviderConfig } from '@/types/oauthProvider'

import GitHubLoginButton from './GitHubLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

const AuthLogin = () => {
  const LoginOAuth: Record<string, ProviderConfig> = {
    google: {
      id: 'googleLogin',
      component: GoogleLoginButton,
      handler: async () => {
        const clientId = `` // Google에서 받은 클라이언트 ID를 여기에 입력하세요
        const redirectUri = `http://ec2-15-164-0-19.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/google` // 콜백 URL을 여기에 입력하세요
        const scope = 'email profile' // 요청하려는 스코프를 여기에 입력하세요

        const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
          scope
        )}&response_type=code&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&client_id=${encodeURIComponent(clientId)}`

        window.location.href = authorizationUrl
        console.log(authorizationUrl)
        // signIn('customGoogle')
      },
    },
    github: {
      id: 'githubLogin',
      component: GitHubLoginButton,
      handler: async () => {
        signIn('github')
      },
    },
  }

  return (
    <>
      <div className="relative flex h-screen flex-col items-center ">
        <Image
          src={logoBg}
          alt="login-bg"
          className="absolute  top-[-32px] z-[-10] w-390pxr bg-gray-900 object-cover"
        />
        <p className="relative mt-56pxr text-left text-lg text-white">
          Welcome to
        </p>
        <p className="relative mt-107pxr h-37pxr w-248pxr text-left text-4xl font-bold text-white">
          Wild Alliance
        </p>

        <div className="relative mt-270pxr">
          {Object.values(LoginOAuth).map(
            ({ id, component: OAuthLoginButton, st, handler }) => (
              <OAuthLoginButton key={id} st={st} handler={handler} />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default AuthLogin
