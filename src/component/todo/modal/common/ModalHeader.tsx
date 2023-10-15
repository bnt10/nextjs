type Props = {
  title: string
}
export default function ModalHeader({ title }: Props) {
  return (
    <header className="flex items-center justify-center border-b border-gray-900 py-10pxr">
      <span className="text-white">{title}</span>
    </header>
  )
}
