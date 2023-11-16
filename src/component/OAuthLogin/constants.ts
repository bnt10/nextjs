import { signIn } from 'next-auth/react'

import type { FormSchema } from '@/hooks/type'
import type { ProviderConfig } from '@/types/oauthProvider'

import GitHubLoginButton from './GitHubLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

export type RegisterFormElements = 'username' | 'password' | 'confirmPassword'
export const RegisterShcema: FormSchema<RegisterFormElements> = {
  username: {
    key: '1',
    value: '',
    type: 'text',
    label: 'Username',
    isControlled: true,
    name: 'username',
    placeholder: 'Enter your UserName',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
  password: {
    key: '2',
    value: '',
    type: 'password',
    label: 'Password',
    isControlled: true,
    name: 'password',
    placeholder: '************',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
  confirmPassword: {
    key: '3',
    value: '',
    type: 'password',
    label: 'Confirm Password',
    isControlled: true,
    name: 'confirmPassword',
    placeholder: '************',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
}

export type LoginFormElements = 'username' | 'password'
export const LoginShcema: FormSchema<LoginFormElements> = {
  username: {
    value: '',
    type: 'text',
    isControlled: true,
    name: 'username',
    placeholder: 'title',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
  password: {
    value: '',
    type: 'text',
    isControlled: true,
    name: 'description',
    placeholder: 'description',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
}

export const LoginOAuth: Record<string, ProviderConfig> = {
  google: {
    id: 'googleLogin',
    component: GoogleLoginButton,
    props: {
      title: 'Register with Google',
      handler: async () => {
        window.location.href =
          'http://ec2-15-164-0-19.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google'
      },
    },
  },
  github: {
    id: 'githubLogin',
    component: GitHubLoginButton,
    props: {
      title: 'Register with Github',
      handler: async () => {
        signIn('github')
      },
    },
  },
}
