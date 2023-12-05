import ConfigList from '@/component/todo/config/ConfigList'
import UserInfo from '@/component/todo/profile/User'
import ProfileLayout from '@/layouts/todo/ProfilePageLayout'
import type { ConfigListType } from '@/types/config'

const profileConfigList: ConfigListType[] = [
  {
    key: '1',
    configTitle: 'Settings',
    configItems: [
      {
        key: '1',
        handler: () => {},
        title: 'App Settings',
        icon: 'HiOutlineCog8Tooth',
      },
    ],
  },
  {
    key: '2',
    configTitle: 'Account',
    configItems: [
      {
        key: '1',
        handler: () => {},
        title: 'Change account name',
        icon: 'AiOutlineUser',
      },
      {
        key: '2',
        handler: () => {},
        title: 'Change account password',
        icon: 'HiOutlineKey',
      },
      {
        key: '3',
        handler: () => {},
        title: 'Change account Image',
        icon: 'AiOutlineCamera',
      },
    ],
  },
  {
    key: '3',
    configTitle: 'Uptodo',
    configItems: [
      {
        key: '1',
        handler: () => {},
        title: 'About US',
        icon: 'AiOutlineAppstore',
      },
      {
        key: '2',
        handler: () => {},
        title: 'FAQ',
        icon: 'HiOutlineExclamationCircle',
      },
      {
        key: '3',
        handler: () => {},
        title: 'Help & Feedback',
        icon: 'AiOutlineQuestionCircle',
      },
      {
        key: '4',
        handler: () => {},
        title: 'Support US',
        icon: 'AiOutlineLike',
      },
      {
        key: 'marker:5',
        handler: () => {},
        title: 'Log out',
        icon: 'AiOutlineLogout',
      },
    ],
  },
]
export default function Profile() {
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
