export const IntroSteps = {
  stepOne: 'stepOne',
  stepTwo: 'stepTwo',
  stepThree: 'stepThree',
} as const

export type IntroStepType = (typeof IntroSteps)[keyof typeof IntroSteps]

export interface IntroProps {
  onNext: () => void
}
