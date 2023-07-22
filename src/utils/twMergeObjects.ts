import { twMerge } from 'tailwind-merge'

const tw = <T extends Record<string, string>>(
  originStyle: T,
  customStyle?: T
): T => {
  if (!customStyle || typeof customStyle === 'string') {
    return originStyle as unknown as T
  }

  const mergedStyle = (
    Object.entries(originStyle) as [keyof T, string][]
  ).reduce((acc: Partial<T>, [key, baseStyle]) => {
    const customStyleValue = customStyle[key]
    if (customStyleValue) {
      acc[key] = twMerge(baseStyle, customStyleValue) as T[keyof T]
    } else {
      acc[key] = baseStyle as T[keyof T]
    }
    return acc
  }, {})

  return { ...originStyle, ...mergedStyle } as T
}

export default tw
