import type { FC, SVGProps } from 'react'
import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'

import { darkenColor } from '@/utils/darkcolor'

export type IconKeys = keyof typeof FaIcons | keyof typeof AiIcons

interface DynamicIconProps {
  iconName: IconKeys
  color?: string
  luminance?: number
  size?: number
}

const DynamicIcon: FC<DynamicIconProps> = ({
  iconName,
  color = '#80FFD1',
  luminance = 0,
  size = 24,
}) => {
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

  const iconColor = darkenColor(color, luminance)
  if (IconComponent) {
    return <IconComponent fontSize={size} style={{ color: iconColor }} />
  }

  return null
}

export default DynamicIcon
