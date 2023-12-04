import Image from 'next/image'

import type { OnNextPath } from './type'
import IntroWrapper from './Wrapper'

export default function IntroStepThree({ onNext, onPrev }: OnNextPath) {
  return (
    <IntroWrapper onPrev={onPrev} onNext={onNext}>
      <div className="flex flex-col items-center justify-center">
        <div className="items-start">
          <Image
            src={'/assets/images/intro/intro3-x.svg'}
            alt="Image description"
            width={257}
            height={251}
          />
        </div>
        <div className="relative mt-[50px]">
          <div className=" left-[15px] top-[0] text-[32px] font-bold text-white text-opacity-90">
            Create daily routine
          </div>
          <div className=" left-[0] top-[80px] w-[299px] text-center text-[16px] font-normal leading-normal text-white text-opacity-90">
            In Uptodo you can create your personalized routine to stay
            productive
          </div>
        </div>
      </div>
    </IntroWrapper>
  )
}
