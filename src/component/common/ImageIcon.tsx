import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Props {
  iconSrc: string
  style?: string
}

const ImageIcon = (props: Props) => {
  const { iconSrc, style } = props
  const st = twMerge(`absolute object-cover`, style)

  const matchesW = st?.match(/w-(\d+)/)
  const matchesH = st?.match(/h-(\d+)/)

  const safeNumber = {
    w: matchesW && matchesW[1] ? parseInt(matchesW[1], 10) : 10,
    h: matchesH && matchesH[1] ? parseInt(matchesH[1], 10) : 10,
  }

  return (
    <Image
      src={iconSrc}
      alt={'icon'}
      width={safeNumber.w}
      height={safeNumber.h}
      className={st}
    />
  )
}

export default ImageIcon
