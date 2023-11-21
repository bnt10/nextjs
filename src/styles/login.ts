import type { InputStyle } from '@/types/style/common'

export const LoginInputBtStyle: InputStyle = {
  input: `w-full flex py-12pxr px-12pxr gap-2.5 item-center rounded border border-gray-900  text-white 
  bg-black-100 outline-none focus:border-gray-900 focus:px-12pxr placeholder-[#535353] mb-3pxr`,
  wrapper: 'mb-13pxr',
}
export const RegisterButtonStyle = {
  button:
    'w-full h-48pxr rounded bg-primary flex items-center justify-center relative mt-20pxr disabled:opacity-25 disabled:cursor-not-allowed',
  icon: '',
  title: 'text-white/[0.87]',
}

export const LoginButtonStyle = {
  button:
    'w-full h-48pxr rounded bg-primary flex items-center justify-center relative mt-69pxr disabled:opacity-25 disabled:cursor-not-allowed',
  icon: '',
  title: 'text-white/[0.87]',
}
