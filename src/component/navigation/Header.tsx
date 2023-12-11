import { useRecoilValue } from 'recoil'

import { ICON_HEADER_PROFILE } from '@/config/icon'
import { userStateSelector } from '@/selectors/userSelector'

import Button from '../common/Button'

export default function Header() {
  const profileSt = {
    button: '',
    icon: 'w-42pxr h-42pxr relative rounded-full',
  }

  const user = useRecoilValue(userStateSelector)

  return (
    <div className="mx-auto mt-13pxr flex h-42pxr w-327pxr items-center justify-between ">
      <span className="text-center  text-xl leading-5 tracking-[-0.03125rem] text-white/[0.87]">
        {user.name}
      </span>

      <Button
        icon={ICON_HEADER_PROFILE}
        style={profileSt}
        title={''}
        handler={() => {}}
      />
    </div>
  )
}
