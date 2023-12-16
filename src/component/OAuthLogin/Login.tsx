import Link from 'next/link'
import type { FormEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { AuthState } from '@/atoms/authAtom'
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
import { LoginSchema } from './constants'
import GitHubLoginButton from './GitHubLoginButton'

function Login() {
  const setModalContent = useSetRecoilState(modalContentState)
  const setAuth = useSetRecoilState(AuthState)

  const LoginOAuth: Record<string, ProviderConfig> = {
    kakao: {
      id: 'kakao',
      component: GitHubLoginButton,
      props: {
        title: 'Login with Kakao',
        handler: async () => {
          window.location.href =
            'https://baftogether.com/oauth2/authorization/kakao'
        },
      },
    },
  }

  const { handleOnChange, handleOnSubmit, getFormFields, formStateRefs } =
    useForm(LoginSchema)
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
    if (status === 200) {
      setAuth({ accessToken: data.accessToken })
    }

    setModalContent(
      <MessageModal
        nextPath={status === 200 ? '/protected/todo/home' : null}
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
            name: fieldName,
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
              name={fieldName}
              type={type}
              handleInputChange={handleOnChange}
              validatePlaceholder={validatePlaceholder}
              invalidMessage={formValues[fieldName]?.error}
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
            href={'/guest/auth/register'}
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
