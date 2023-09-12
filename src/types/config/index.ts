import type { IconKeys } from '@/component/common/Icon'

export type ConfigItemType = {
  key: string
  icon: IconKeys
  title: string
  handler: () => void
}

export type ConfigListType = {
  key: string
  configTitle: string
  configItems: ConfigItemType[]
}
