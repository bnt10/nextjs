import type { ButtonStyle } from '@/types/style/common'

export const addTaskInputSt = {
  input: `w-full flex py-8pxr gap-2.5 item-center rounded border border-transparent text-white mb-13pxr
  bg-transparent outline-none focus:border-gray-900 focus:px-16pxr placeholder-gray-800 `,
}

export const addTaskDescription = {
  input: `${addTaskInputSt.input}`,
}
export const iconBtnSt: ButtonStyle = {
  button: 'h-30pxr',
  icon: 'w-24pxr h-24px relative  flex-shrink-0',
}
