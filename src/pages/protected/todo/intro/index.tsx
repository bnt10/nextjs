import { useRouter } from 'next/router'
import { useState } from 'react'

import IntroStepFour from '@/component/intro/StepFourSplash'
import IntroStepOne from '@/component/intro/StepOneSplash'
import IntroStepThree from '@/component/intro/StepThreeSpalsh'
import IntroStepTwo from '@/component/intro/StepTwoSplash'
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
        <IntroStepThree
          onPrev={() => setIntroStep(IntroSteps.stepTwo)}
          onNext={() => setIntroStep(IntroSteps.stepFour)}
        />
      )}
      {introStep === IntroSteps.stepFour && (
        <IntroStepFour
          onPrev={() => setIntroStep(IntroSteps.stepThree)}
          onNext={() => router.push('/todo/home')}
        />
      )}
    </div>
  )
}
