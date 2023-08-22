import type { FC, SVGProps } from 'react'
import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'

export type IconKeys = keyof typeof FaIcons | keyof typeof AiIcons

interface DynamicIconProps {
  iconName: IconKeys
  style: React.CSSProperties | undefined
}

const DynamicIcon: FC<DynamicIconProps> = ({ iconName, style }) => {
  let IconComponent: React.ComponentType<SVGProps<SVGSVGElement>> | null = null

  if (Object.hasOwnProperty.call(FaIcons, iconName)) {
    IconComponent = FaIcons[
      iconName as keyof typeof FaIcons
    ] as React.ComponentType<SVGProps<SVGSVGElement>>
  } else if (Object.hasOwnProperty.call(AiIcons, iconName)) {
    IconComponent = AiIcons[
      iconName as keyof typeof AiIcons
    ] as React.ComponentType<SVGProps<SVGSVGElement>>
  }

  if (IconComponent) {
    return <IconComponent style={style} />
  }

  return null
}

export default DynamicIcon
