import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import type { OnNextPath } from './type'
import IntroWrapper from './Wrapper'

interface Props {
  onNext: OnNextPath['onNext']
}
export default function IntroStepOne({ onNext }: Props) {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      onNext()
    }, 2000)
  }, [router])

  return (
    <IntroWrapper onNext={onNext} DisableNextButton>
      <div className="flex h-screen items-center justify-center">
        <Image
          src={'/assets/images/intro/intro-main-splash.svg'}
          alt="Image description"
          width={200}
          height={200}
        />
      </div>
    </IntroWrapper>
  )
}
