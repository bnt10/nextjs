import Button from '../common/Button'

export default function Header() {
  const headerBtnSt = {
    button: 'p-9pxr',
    icon: 'w-24pxr h-24pxr relative',
  }
  const profileSt = {
    button: '',
    icon: 'w-42pxr h-42pxr relative rounded-full',
  }
  return (
    <div className="mx-auto mt-13pxr flex h-42pxr w-327pxr items-center justify-between ">
      <Button
        icon={'/assets/images/todo/header/more-button.svg'}
        style={headerBtnSt}
        title={''}
        handler={() => {}}
      />
      <span className="text-center  text-xl leading-5 tracking-[-0.03125rem] text-white/[0.87]">
        Index
      </span>

      <Button
        icon={'/assets/images/todo/header/profile.jpg'}
        style={profileSt}
        title={''}
        handler={() => {}}
      />
    </div>
  )
}
