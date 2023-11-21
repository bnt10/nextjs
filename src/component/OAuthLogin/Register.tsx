import Link from 'next/link'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import type { SubmitFormData } from '@/hooks/type'
import useEffectAfterMount from '@/hooks/useEffectAfterMount'
import { useForm } from '@/hooks/useForm'
import Layout from '@/layouts'
import ScrollLayout from '@/layouts/ScroolLayout'
import { createUser } from '@/services/users/api'
import { LoginInputBtStyle, RegisterButtonStyle } from '@/styles/login'

import Button from '../common/Button'
import Input from '../common/Input'
import MessageModal from '../common/MessageModal'
import type { RegisterFormElements } from './constants'
import { LoginOAuth, RegisterShcema } from './constants'

const AuthLogin = () => {
  const setModalContent = useSetRecoilState(modalContentState)

  const {
    handleOnChange,
    handleOnSubmit,
    getFormFields,
    formStateRefs,
    isFormValid,
  } = useForm(RegisterShcema)

  const formFields = getFormFields()
  const formValues = formStateRefs.current
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false)
  const handlerRegister = async (
    e: FormEvent<HTMLFormElement>,
    formData: SubmitFormData<RegisterFormElements>
  ) => {
    const { username, password, confirmPassword } = formData
    const { data, status } = await createUser({
      userName: username,
      password,
      confirmPassword,
    })

    setModalContent(
      <MessageModal
        nextPath={status === 200 ? '/todo/home' : null}
        confirmTitle={'확인'}
        message={data.message}
      />
    )

    e.preventDefault()
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e)
  }
  useEffectAfterMount(() => {
    setSubmitDisabled(!isFormValid)
  }, [isFormValid])
  return (
    <Layout>
      <ScrollLayout>
        <h1 className="mb-53pxr mt-78pxr w-full text-2xbase text-white/[0.87]">
          Register
        </h1>
        <form className="w-full" onSubmit={handleOnSubmit(handlerRegister)}>
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
                handleInputChange={handleInputChange}
                validatePlaceholder={validatePlaceholder}
                innvvalidMessage={formValues[fieldname]?.error}
              />
            )
          )}

          <Button
            disabled={submitDisabled}
            style={RegisterButtonStyle}
            buttonType="submit"
            title="Register"
          />
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
        <footer className="mb-10pxr">
          <div>
            <span className="font-['Lato'] text-xs font-normal leading-[18.06px] text-neutral-400">
              Already have an account?
            </span>
            <Link
              href={'/'}
              className="font-['Lato'] text-xs font-normal leading-[18.06px] text-white text-opacity-90"
            >
              {' '}
              Login
            </Link>
          </div>
        </footer>
      </ScrollLayout>
    </Layout>
  )
}

export default AuthLogin
