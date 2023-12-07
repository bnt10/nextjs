import Image from 'next/image'

import type { OnNextPath } from './type'
import IntroWrapper from './Wrapper'

export default function IntroStepTwo({ onNext, onPrev }: OnNextPath) {
  return (
    <IntroWrapper onPrev={onPrev} onNext={onNext}>
      <div className="flex flex-col items-center justify-center">
        <div className="items-start">
          <Image
            src={'/assets/images/intro/intro2-x.svg'}
            alt="Image description"
            width={257}
            height={251}
          />
        </div>
        <div className="relative mt-[50px]">
          <div className=" left-[15px] top-[0] text-[32px] font-bold text-white text-opacity-90">
            Manage your tasks
          </div>
          <div className=" left-[0] top-[80px] w-[299px] text-center text-[16px] font-normal leading-normal text-white text-opacity-90">
            You can easily manage all of your daily tasks in DoMe for free
          </div>
        </div>
      </div>
    </IntroWrapper>
  )
}
