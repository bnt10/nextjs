import { signIn } from 'next-auth/react'

import Layout from '@/layouts'
import { LoginButtonStyle, LoginInputBtStyle } from '@/styles/login'
import type { ProviderConfig } from '@/types/oauthProvider'

import Button from '../common/Button'
import Input from '../common/Input'
import GitHubLoginButton from './GitHubLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

const AuthLogin = () => {
  const LoginOAuth: Record<string, ProviderConfig> = {
    google: {
      id: 'googleLogin',
      component: GoogleLoginButton,
      handler: async () => {
        window.location.href =
          'http://ec2-15-164-0-19.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google'
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
    <Layout>
      <h1 className="mb-53pxr mt-78pxr w-full text-2xbase text-white/[0.87]">
        Login
      </h1>
      <form className="w-full">
        <Input
          style={LoginInputBtStyle}
          label="Username"
          placeholder="Enter your UserName"
          name={'username'}
          type={'text'}
        />
        <Input
          label="Password"
          style={LoginInputBtStyle}
          placeholder="************"
          name={'password'}
          type={'text'}
        />
        <Button style={LoginButtonStyle} buttonType="submit" title="Login" />
      </form>
      <div className="mb-29pxr mt-31pxr flex w-full items-center">
        <div className="grow border-t border-gray-400"></div>
        <span className="mx-4pxr shrink text-gray-400">or</span>
        <div className="grow border-t border-gray-400"></div>
      </div>
      <div className="relative w-full">
        {Object.values(LoginOAuth).map(
          ({ id, component: OAuthLoginButton, st, handler }) => (
            <OAuthLoginButton key={id} st={st} handler={handler} />
          )
        )}
      </div>
      {/* <div>
        <span className="font-['Lato'] text-xs font-normal leading-[18.06px] text-neutral-400">
          Don’t have an account?
        </span>
        <span className="font-['Lato'] text-xs font-normal leading-[18.06px] text-white text-opacity-90">
          Register
        </span>
      </div> */}
    </Layout>
  )
}

export default AuthLogin
