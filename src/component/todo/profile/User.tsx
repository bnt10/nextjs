import Image from 'next/image'

import type { ButtonStyle } from '@/component/common/Button'
import Button from '@/component/common/Button'

const buttonStyle: ButtonStyle = {
  button:
    'w-[50%] border-box first:mr-15pxr py-17pxr flex justify-center rounded bg-footer-gray',
}

export default function UserInfo() {
  const handler = () => {}
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-10pxr mt-24pxr h-85pxr w-85pxr">
        <Image
          src={'/assets/images/profile.png'}
          alt="Profile Image"
          className="rounded-full"
          width={85}
          height={85}
        />
      </div>
      <div className="mb-20pxr text-xl text-white">Martha Hays</div>

      <div className="mb-24pxr flex w-full justify-between">
        <Button style={buttonStyle} handler={handler} title={'10 Task left'} />
        <Button style={buttonStyle} handler={handler} title={'5 Task Done'} />
      </div>
    </div>
  )
}
