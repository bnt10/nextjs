import { signIn } from 'next-auth/react'

import type { FormSchema } from '@/hooks/type'
import type { ProviderConfig } from '@/types/oauthProvider'

import GitHubLoginButton from './GitHubLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

export type RegisterFormElements = 'username' | 'password' | 'confirmPassword'

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/

export const isValidPassword = (password: string, regex: RegExp) => {
  if (!regex.test(password)) return false
  if (/(\w)\1\1/i.test(password)) return false
  return true
}
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
    validatePlaceholder: [
      '영문/숫자/특수문자 2가지 이상 포함',
      '8지 이상 32자 이하 입력(공백제외)',
      '연속 3자 이상 동일한 문자/숫자 제외',
    ],
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      if (!isValidPassword(value, passwordRegex)) {
        return '비밀번호 형식이 맞지 않습니다.'
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
    validate: (value: string, formState) => {
      if (!value) {
        return '입력이 필요합니다.'
      }

      if (value !== formState?.password?.value) {
        return '비밀번호가 일치하지 않습니다.'
      }
      return null
    },
  },
}

export type LoginFormElements = 'username' | 'password'
export const LoginShcema: FormSchema<LoginFormElements> = {
  username: {
    key: '1',
    value: '',
    type: 'text',
    isControlled: true,
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your Username',
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
    isControlled: true,
    name: 'password',
    label: 'Password',
    placeholder: '************',
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
