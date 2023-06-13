import Button from '../common/Button'
import type { IntroProps } from './type'

export default function IntroStepOne(props: IntroProps) {
  const { onNext } = props
  const buttonStyles = {
    button:
      'flex relative overflow-hidden rounded-2xl bg-[#dddede] text-neutral-900 items-center justify-center',
  }
  return (
    <div>
      Intro Step One
      <Button style={buttonStyles} handler={onNext} title={'Next'} />
    </div>
  )
}
