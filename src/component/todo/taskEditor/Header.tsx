import { useRouter } from 'next/router'

import Button from '@/component/common/Button'
import { ICON_CLOSE } from '@/config/icon'

const headerButtonStyle = {
  icon: 'h-24pxr w-24pxr relative',
  button:
    'h-32pxr w-32pxr flex justify-center items-center bg-footer-gray box-border rounded',
}
export default function TaskEditorPageHeader() {
  const router = useRouter()
  const onCloseHandler = () => {
    router.back()
  }

  return (
    <header className="mx-auto mb-13pxr flex h-42pxr w-full items-center justify-between pt-13pxr">
      <Button
        style={headerButtonStyle}
        handler={onCloseHandler}
        icon={ICON_CLOSE}
      />
    </header>
  )
}
