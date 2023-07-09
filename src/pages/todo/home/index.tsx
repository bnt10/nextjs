import Image from 'next/image'

import HomeLayout from '@/layouts/todo/HomeLayout'

export default function TodoHome() {
  return (
    <>
      <HomeLayout>
        <div className="mt-75pxr flex flex-col items-center justify-center">
          <div className="items-start">
            <Image
              src={'/assets/images/todo/home/index.svg'}
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
        </div>
      </HomeLayout>
    </>
  )
}
