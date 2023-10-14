import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import Button from '@/component/common/Button'
import { ICON_FALG, ICON_SEND, ICON_TAG, ICON_TIMER } from '@/config/icon'
import { iconBtnSt } from '@/styles/todo/home'
import type { Component } from '@/types/component'

import Calendar from '../modal/Calendar'
import TaskCategory from '../modal/TaskCategory'
import TaskPriority from '../modal/TaskPriority'

export default function TaskButton() {
  const [, setModalContent] = useRecoilState(modalContentState)

  const TaskWithButton: Record<string, Component> = {
    timer: {
      id: 'timer',
      component: Button,
      props: { style: iconBtnSt, icon: ICON_TIMER },
      handler: async () => {
        setModalContent(<Calendar />)
      },
    },
    tag: {
      id: 'tag',
      component: Button,
      props: { style: iconBtnSt, icon: ICON_TAG },
      handler: async () => {
        setModalContent(<TaskCategory />)
      },
    },
    flag: {
      id: 'flag',
      component: Button,
      props: { style: iconBtnSt, icon: ICON_FALG },
      handler: async () => {
        setModalContent(<TaskPriority />)
      },
    },
    send: {
      id: 'send',
      component: Button,
      props: {
        style: {
          icon: 'absolute right-26pxr bottom-17pxr w-24pxr h-24pxr flex-shrink-0',
        },
        icon: ICON_SEND,
      },
      handler: async () => {},
    },
  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex w-150pxr justify-between">
        {Object.values(TaskWithButton).map(
          ({ id, component: Component, props, handler }) => (
            <Component key={id} {...props} handler={handler} />
          )
        )}
      </div>
    </div>
  )
}
