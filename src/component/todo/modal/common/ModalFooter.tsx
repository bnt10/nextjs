import ModalActionButtons from '../ModalActionButtons'

interface Props {
  saveHandler: () => void
}
export default function ModalFooter({ saveHandler }: Props) {
  return (
    <footer>
      <ModalActionButtons saveTitle={'Save'} saveHandler={saveHandler} />
    </footer>
  )
}
