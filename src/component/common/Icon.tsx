import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Props {
  iconSrc: string
  style?: string
}

const Icon = (props: Props) => {
  const { iconSrc, style } = props
  const st = twMerge(
    `absolute left-24pxr top-10pxr h-30pxr w-30pxr object-cover`,
    style
  )

  return (
    <div>
      <Image src={iconSrc} alt={'icon'} width={10} height={10} className={st} />
    </div>
  )
}

export default Icon
