import Button from '../common/Button'

export default function Header() {
  const headerBtnSt = {
    button: 'p-9pxr',
    icon: 'w-24pxr, h-24pxr relative',
  }
  return (
    <div className="mx-auto mt-13pxr flex h-42pxr w-327pxr items-center justify-between bg-slate-500">
      <Button
        icon={'/assets/images/todo/header/more-button.svg'}
        style={headerBtnSt}
        title={''}
        handler={() => {}}
      />
      <span className="text-center text-xl text-white/[0.87]">Index</span>

      <div>profile</div>
    </div>
  )
}
