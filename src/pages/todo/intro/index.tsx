import { useRouter } from 'next/router'
import { useState } from 'react'

import IntroStepOne from '@/component/intro/stepOne'
import IntroStepThree from '@/component/intro/stepThree'
import IntroStepTwo from '@/component/intro/stepTwo'
import type { IntroStepType } from '@/component/intro/type'
import { IntroSteps } from '@/component/intro/type'

export default function Intro() {
  const [introStep, setIntroStep] = useState<IntroStepType>(IntroSteps.stepOne)
  const router = useRouter()
  return (
    <div>
      {introStep === IntroSteps.stepOne && (
        <IntroStepOne onNext={() => setIntroStep(IntroSteps.stepTwo)} />
      )}
      {introStep === IntroSteps.stepTwo && (
        <IntroStepTwo onNext={() => setIntroStep(IntroSteps.stepThree)} />
      )}
      {introStep === IntroSteps.stepThree && (
        <IntroStepThree onNext={() => router.push('/')} />
      )}
      Intro
    </div>
  )
}
