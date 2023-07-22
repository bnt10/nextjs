import Button from '@/component/common/Button'
import { iconBtnSt } from '@/styles/todo/home'
import type { Component } from '@/types/component'

export default function TaskButton() {
  const TaskWithButton: Record<string, Component> = {
    timer: {
      id: 'timer',
      component: Button,
      props: { style: iconBtnSt, icon: '/assets/images/todo/home/timer.svg' },
      handler: async () => {},
    },
    tag: {
      id: 'tag',
      component: Button,
      props: { style: iconBtnSt, icon: '/assets/images/todo/home/tag.svg' },
      handler: async () => {},
    },
    flag: {
      id: 'flag',
      component: Button,
      props: { style: iconBtnSt, icon: '/assets/images/todo/home/flag.svg' },
      handler: async () => {},
    },
    send: {
      id: 'send',
      component: Button,
      props: {
        style: {
          icon: 'absolute right-26pxr bottom-17pxr w-24pxr h-24pxr flex-shrink-0',
        },
        icon: '/assets/images/todo/home/send.svg',
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
