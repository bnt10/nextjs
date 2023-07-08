import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import Button from '../common/Button'
import type { IntroProps } from './type'

export default function IntroWraper({
  onNext,
  onPrev,

  DisableNextButton = false,
  children,
}: IntroProps) {
  const router = useRouter()

  const preButtonSt = {
    button: 'mr-auto text-left text-base uppercase text-white/[0.44]',
  }
  const nextButtonSt = {
    button: 'ml-auto text-left text-base uppercase text-white',
  }
  const skipButtonSt = {
    button:
      'top-[14pxr] font-normal uppercase leading-normal text-[16pxr] text-white text-opacity-40',
  }

  const onSkip = () => {
    router.push('/')
  }

  return (
    <div className="h-screen bg-gray-900 px-24pxr pt-14pxr">
      {!DisableNextButton && (
        <Button title={'Skip'} style={skipButtonSt} handler={onSkip} />
      )}

      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}

        {!DisableNextButton && (
          <div className="absolute bottom-62pxr flex w-327pxr ">
            {onPrev && (
              <Button style={preButtonSt} handler={onPrev} title={'Back'} />
            )}
            <Button style={nextButtonSt} handler={onNext} title={'Next'} />
          </div>
        )}
      </motion.div>
    </div>
  )
}
