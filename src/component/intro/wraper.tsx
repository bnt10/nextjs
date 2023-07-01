import { motion } from 'framer-motion'

import Button from '../common/Button'
import type { IntroProps } from './type'

export default function IntroWraper({
  onNext,
  DisableNextButton = false,
  children,
}: IntroProps) {
  const buttonStyles = {
    button:
      'flex relative overflow-hidden rounded-2xl bg-[#dddede] text-neutral-900 items-center justify-center',
  }
  return (
    <motion.div
      className="flex h-screen items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
      {!DisableNextButton && (
        <Button style={buttonStyles} handler={onNext} title={'Next'} />
      )}
    </motion.div>
  )
}
