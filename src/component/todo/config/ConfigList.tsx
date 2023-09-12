import type { ConfigListType } from '@/types/config'

import ConfigItem from './ConfigItem'
import ConfigItemTitle from './ConfigItemTitle'

export default function ConfigList({
  configTitle,
  configItems,
}: ConfigListType) {
  return (
    <>
      <ConfigItemTitle title={configTitle} />
      {configItems.map(({ key, icon, title, handler }) => (
        <ConfigItem key={key} icon={icon} title={title} handler={handler} />
      ))}
    </>
  )
}
