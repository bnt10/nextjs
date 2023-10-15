import type { FormSchema } from '@/hooks/type'

export const MODAL_HEADER_TITLE = {
  Priority: 'Task Proirity',
  Task: 'Edit Task title',
}
export const MODAL_FOOTER_SAVE_BUTTON = 'SAVE'

export type TaskFormElements = 'title' | 'description'

export const addTaskShcema: FormSchema<TaskFormElements> = {
  title: {
    value: '',
    type: 'text',
    isControlled: true,
    name: 'title',
    placeholder: 'title',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
  description: {
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
