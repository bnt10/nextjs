import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  onNext: () => void
  img?: string
}
export default function SplashScreen({ onNext, img }: Props) {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      onNext()
    }, 2000)
  }, [router])

  return (
    <motion.div
      className="flex h-screen items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={img || '/assets/images/intro/intro-main-splash.svg'}
        alt="Image description"
        width={200}
        height={200}
      />
    </motion.div>
  )
}
