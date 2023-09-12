interface Props {
  title: string
}
export default function ConfigItemTitle({ title }: Props) {
  return (
    <div className="mb-4pxr mt-8pxr w-full">
      <span className="text-gray-800"> {title}</span>
    </div>
  )
}
