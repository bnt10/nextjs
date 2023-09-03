import { useRouter } from 'next/router'

import {
  ICON_ADD,
  ICON_CALENDAR,
  ICON_CLOCK,
  ICON_HOME,
  ICON_PROFILE,
} from '@/config/icon'
import useModal from '@/hooks/useModal'

import Button from '../common/Button'

export default function Footer() {
  const { openModal, setOpenModal } = useModal()
  const router = useRouter()

  const textWithIconBtnStyle = {
    button:
      'flex ml-20 w-48pxr h-50pxr flex-col align-middle justify-center items-center',
    icon: 'relative w-24pxr, h-24pxr',
    title: 'mt-10pxr text-xs text-white',
  }
  const footerItem = [
    {
      title: 'index',
      icon: ICON_HOME,
      handler: () => {},
      style: textWithIconBtnStyle,
    },
    {
      title: 'Calendar',
      icon: ICON_CALENDAR,
      handler: async () => {
        router.push('/todo/calendar/')
      },
      style: textWithIconBtnStyle,
    },
    {
      title: '',
      icon: ICON_ADD,
      handler: () => {
        setOpenModal(!openModal)
      },
      style: {
        button:
          'w-64pxr h-64pxr rounded-full bg-primary flex items-center justify-center relative bottom-42pxr',
        icon: 'w-32pxr h-32pxr relative',
      },
    },
    {
      title: 'Focuse',
      icon: ICON_CLOCK,
      handler: () => {},
      style: textWithIconBtnStyle,
    },
    {
      title: 'Profile',
      icon: ICON_PROFILE,
      handler: () => {},
      style: textWithIconBtnStyle,
    },
  ]

  return (
    <div className="absolute bottom-0pxr box-border flex h-100pxr  w-full justify-between bg-footer-gray px-20pxr pt-12pxr">
      {footerItem.map(({ title, icon, style, handler }) => {
        return (
          <Button
            key={title}
            title={title}
            handler={handler}
            icon={icon}
            style={style}
          />
        )
      })}
    </div>
  )
}
