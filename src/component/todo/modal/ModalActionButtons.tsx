import Button from '@/component/common/Button'
import {
  modalCancelButtonSt,
  modalSaveButtonSt,
} from '@/styles/todo/modal/button'

interface Props {
  saveTitle: string
  saveHandler: () => void
  cancelTitle: string
  cancelHandler: () => void
}
export default function ModalActionButtons({
  saveTitle,
  saveHandler,
  cancelHandler,
  cancelTitle,
}: Props) {
  return (
    <div className="flex items-center justify-center  px-8pxr pb-8pxr  ">
      <Button
        title={cancelTitle}
        style={modalCancelButtonSt}
        handler={saveHandler}
      />
      <Button
        title={saveTitle}
        style={modalSaveButtonSt}
        handler={cancelHandler}
      />
    </div>
  )
}