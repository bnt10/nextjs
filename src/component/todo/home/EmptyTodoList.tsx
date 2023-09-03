import Image from 'next/image'

import { ICON_EMPTY } from '@/config/icon'

export default function EmptyTodoList() {
  return (
    <>
      <div className="mt-75pxr items-start">
        <Image
          src={ICON_EMPTY}
          alt="Image description"
          width={227}
          height={227}
        />
      </div>
      <div className="relative mt-[10pxr]">
        <div className=" text-xl leading-normal  text-white text-opacity-90">
          What do you want to do today?
        </div>
        <div className="mt-10pxr text-center text-base font-normal leading-normal text-white text-opacity-90">
          Tap + to add your tasks
        </div>
      </div>
    </>
  )
}
