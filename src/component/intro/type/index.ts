import type { ReactNode } from 'react'

export const IntroSteps = {
  stepOne: 'stepOne',
  stepTwo: 'stepTwo',
  stepThree: 'stepThree',
  stepFour: 'stepFour',
} as const

export type IntroStepType = (typeof IntroSteps)[keyof typeof IntroSteps]

export type OnNextPath = Pick<IntroProps, 'onNext'>
export interface IntroProps {
  onNext: () => void
  children: ReactNode
  DisableNextButton?: boolean
}
