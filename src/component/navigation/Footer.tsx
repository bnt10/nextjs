import { useRecoilState } from 'recoil'

import useModal from '@/hooks/useModal'
import { modalContentState } from '@/pages/state/modalAtom'

import Button from '../common/Button'
import Calendar from '../todo/modal/Calendar'

export default function Footer() {
  const { openModal, setOpenModal } = useModal()
  const [, setModalContent] = useRecoilState(modalContentState)
  const textWithIconBtnStyle = {
    button:
      'flex ml-20 w-48pxr h-50pxr flex-col align-middle justify-center items-center',
    icon: 'relative w-24pxr, h-24pxr',
    title: 'mt-10pxr text-xs text-white',
  }
  const footerItem = [
    {
      title: 'index',
      icon: '/assets/images/todo/footer/home.svg',
      handler: () => {},
      style: textWithIconBtnStyle,
    },
    {
      title: 'Calendar',
      icon: '/assets/images/todo/footer/calendar.svg',
      handler: async () => {
        setModalContent(<Calendar />)
      },
      style: textWithIconBtnStyle,
    },
    {
      title: '',
      icon: '/assets/images/todo/footer/add.svg',
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
      icon: '/assets/images/todo/footer/clock.svg',
      handler: () => {},
      style: textWithIconBtnStyle,
    },
    {
      title: 'Profile',
      icon: '/assets/images/todo/footer/profile.svg',
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
