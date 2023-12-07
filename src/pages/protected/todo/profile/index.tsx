import { useRouter } from 'next/router'

import ConfigList from '@/component/todo/config/ConfigList'
import UserInfo from '@/component/todo/profile/User'
import ProfileLayout from '@/layouts/todo/ProfilePageLayout'
import { logoutUser } from '@/services/users/api'
import type { ConfigListType } from '@/types/config'

export default function Profile() {
  const router = useRouter()
  const profileConfigList: ConfigListType[] = [
    {
      key: 'Settings',
      configTitle: 'Settings',
      configItems: [
        {
          key: 'Settings_1',
          handler: () => {},
          title: 'App Settings',
          icon: 'HiOutlineCog8Tooth',
        },
      ],
    },
    {
      key: 'Account',
      configTitle: 'Account',
      configItems: [
        {
          key: 'Account_1',
          handler: () => {},
          title: 'Change account name',
          icon: 'AiOutlineUser',
        },
        {
          key: 'Account_2',
          handler: () => {},
          title: 'Change account password',
          icon: 'HiOutlineKey',
        },
        {
          key: 'Account_3',
          handler: () => {},
          title: 'Change account Image',
          icon: 'AiOutlineCamera',
        },
      ],
    },
    {
      key: 'Uptodo',
      configTitle: 'Uptodo',
      configItems: [
        {
          key: 'Uptodo_1',
          handler: () => {},
          title: 'About US',
          icon: 'AiOutlineAppstore',
        },
        {
          key: 'Uptodo_2',
          handler: () => {},
          title: 'FAQ',
          icon: 'HiOutlineExclamationCircle',
        },
        {
          key: 'Uptodo_3',
          handler: () => {},
          title: 'Help & Feedback',
          icon: 'AiOutlineQuestionCircle',
        },
        {
          key: 'Uptodo_4',
          handler: () => {},
          title: 'Support US',
          icon: 'AiOutlineLike',
        },
        {
          key: 'Uptodo_5',
          handler: async () => {
            const res = await logoutUser()
            if (res.status === 200) {
              router.replace('/')
            }
          },
          title: 'Log out',
          icon: 'AiOutlineLogout',
        },
      ],
    },
  ]

  return (
    <ProfileLayout>
      <UserInfo />
      <section className="w-full">
        {profileConfigList.map(({ key, configTitle, configItems }) => {
          return (
            <ConfigList
              key={key}
              configTitle={configTitle}
              configItems={configItems}
            />
          )
        })}
      </section>
    </ProfileLayout>
  )
}
