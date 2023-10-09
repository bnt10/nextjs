import type { FC, SVGProps } from 'react'
import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as Hi12Icons from 'react-icons/hi2'

import { darkenColor } from '@/utils/darkcolor'

export type IconKeys =
  | keyof typeof FaIcons
  | keyof typeof AiIcons
  | keyof typeof Hi12Icons

interface DynamicIconProps {
  iconName: IconKeys
  color?: string
  luminance?: number
  size?: number
}

// 객체로 아이콘 라이브러리 묶기
const iconLibraries = {
  FaIcons,
  AiIcons,
  Hi12Icons,
}

const DynamicIcon: FC<DynamicIconProps> = ({
  iconName,
  color = '#80FFD1',
  luminance = 0,
  size = 24,
}) => {
  let IconComponent: React.ComponentType<SVGProps<SVGSVGElement>> | null = null

  for (const library of Object.values(iconLibraries)) {
    if (Object.hasOwnProperty.call(library, iconName)) {
      IconComponent = library[
        iconName as keyof typeof library
      ] as React.ComponentType<SVGProps<SVGSVGElement>>
      break
    }
  }

  const iconColor = darkenColor(color, luminance)
  const iconWrapStyle = `w-${size}pxr h-${size}pxr box-border`
  if (IconComponent) {
    return (
      <div className={iconWrapStyle}>
        <IconComponent
          className={`h-full w-full`}
          style={{ color: iconColor }}
        />
      </div>
    )
  }

  return null
}

export default DynamicIcon
