import Button from '@/component/common/Button'
import { ICON_CLOSE, ICON_REPEAT } from '@/config/icon'

const headerButtonStyle = {
  icon: 'h-24pxr w-24pxr relative',
  button:
    'h-32pxr w-32pxr flex justify-center items-center bg-footer-gray box-border rounded',
}
export default function TaskEditorPageHeader() {
  const onCloseHandler = () => {}
  const onRefeatHandler = () => {}

  return (
    <div className="mx-auto mt-13pxr flex h-42pxr w-full items-center justify-between px-28pxr ">
      <Button
        style={headerButtonStyle}
        handler={onCloseHandler}
        icon={ICON_CLOSE}
      />
      <Button
        style={headerButtonStyle}
        handler={onRefeatHandler}
        icon={ICON_REPEAT}
      />
    </div>
  )
}
