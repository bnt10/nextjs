import Image from 'next/image'

import type { OnNextPath } from './type'
import IntroWraper from './wraper'

export default function IntroStepFour({ onNext, onPrev }: OnNextPath) {
  return (
    <IntroWraper onPrev={onPrev} onNext={onNext}>
      <div className="flex flex-col items-center justify-center">
        <div className="items-start">
          <Image
            src={'/assets/images/intro/intro4-x.svg'}
            alt="Image description"
            width={257}
            height={251}
          />
        </div>
        <div className="relative mt-[50px]">
          <div className=" left-[15px] top-[0] text-[32px] font-bold text-white text-opacity-90">
            Orgonaize your tasks
          </div>
          <div className=" left-[0] top-[80px] w-[299px] text-center text-[16px] font-normal leading-normal text-white text-opacity-90">
            You can organize your daily tasks by adding your tasks into separate
            categories
          </div>
        </div>
      </div>
    </IntroWraper>
  )
}
