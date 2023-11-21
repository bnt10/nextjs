import Link from 'next/link'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import type { SubmitFormData } from '@/hooks/type'
import { useForm } from '@/hooks/useForm'
import Layout from '@/layouts'
import { loginUser } from '@/services/users/api'
import { LoginButtonStyle, LoginInputBtStyle } from '@/styles/login'
import type { ProviderConfig } from '@/types/oauthProvider'

import Button from '../common/Button'
import Input from '../common/Input'
import MessageModal from '../common/MessageModal'
import type { LoginFormElements } from './constants'
import { LoginShcema } from './constants'
import GitHubLoginButton from './GitHubLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

export function Login() {
  const setModalContent = useSetRecoilState(modalContentState)

  const LoginOAuth: Record<string, ProviderConfig> = {
    google: {
      id: 'googleLogin',
      component: GoogleLoginButton,
      props: {
        title: 'Login with Google',
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
        title: 'Login with Github',
        handler: async () => {
          signIn('github')
        },
      },
    },
  }

  const { handleOnChange, handleOnSubmit, getFormFields, formStateRefs } =
    useForm(LoginShcema)
  const formFields = getFormFields()
  const formValues = formStateRefs.current

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
    formData: SubmitFormData<LoginFormElements>
  ) => {
    e.preventDefault()
    const { username, password } = formData
    const { data, status } = await loginUser({
      userName: username,
      password,
    })
    setModalContent(
      <MessageModal
        nextPath={status === 200 ? '/todo/home' : null}
        confirmTitle={'확인'}
        message={data.message}
      />
    )
  }
  return (
    <Layout>
      <h1 className="mb-53pxr mt-78pxr w-full text-2xbase text-white/[0.87]">
        Login
      </h1>
      <form className="w-full" onSubmit={handleOnSubmit(handleLogin)}>
        {Object.values(formFields).map(
          ({
            key,
            value,
            label,
            placeholder,
            name: fieldname,
            type,
            validatePlaceholder,
            ref,
          }) => (
            <Input
              inputRef={ref}
              key={key}
              style={LoginInputBtStyle}
              value={value}
              label={label}
              placeholder={placeholder}
              name={fieldname}
              type={type}
              handleInputChange={handleOnChange}
              validatePlaceholder={validatePlaceholder}
              innvvalidMessage={formValues[fieldname]?.error}
            />
          )
        )}
        <Button style={LoginButtonStyle} buttonType="submit" title="Login" />
      </form>
      <div className="mb-29pxr mt-31pxr flex w-full items-center">
        <div className="grow border-t border-gray-400"></div>
        <span className="mx-4pxr shrink text-gray-400">or</span>
        <div className="grow border-t border-gray-400"></div>
      </div>
      <div className="relative w-full">
        {Object.values(LoginOAuth).map(
          ({ id, component: OAuthLoginButton, props }) => (
            <OAuthLoginButton
              key={id}
              st={props!.st}
              handler={props!.handler}
              title={props!.title}
            />
          )
        )}
      </div>
      <footer>
        <div>
          <span className="font-['Lato'] text-xs font-normal leading-[18.06px] text-neutral-400">
            Don’t have an account?
          </span>
          <Link
            href={'/users/register/'}
            className="font-['Lato'] text-xs font-normal leading-[18.06px] text-white text-opacity-90"
          >
            {' '}
            Register
          </Link>
        </div>
      </footer>
    </Layout>
  )
}

export default Login
