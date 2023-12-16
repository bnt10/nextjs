import ModalLayout from '../todo/modal/common/ModalLayout'

export const ProfileChangeImage = () => {
  const ChangeImageButtons = [
    {
      key: 'tackPicture',
      title: 'Tack picture',
      handler: () => {},
      style: 'flex h-48pxr items-center text-base text-white/[0.87]',
    },
    {
      key: 'importFromGallery',
      title: 'Import from gallery',
      handler: () => {},
      style: 'flex h-48pxr items-center text-base text-white/[0.87]',
    },
  ]
  return (
    <ModalLayout>
      <div className="flex items-center justify-center border-b border-gray-900 py-10pxr">
        <span className="text-white">Change account Image</span>
      </div>
      <div className="flex flex-wrap items-center px-4pxr pb-20pxr pt-16pxr">
        <div className="flex w-full flex-col">
          {ChangeImageButtons.map(({ title, handler, style, key }) => (
            <button className={style} onClick={handler} key={key}>
              {title}
            </button>
          ))}
        </div>
      </div>
    </ModalLayout>
  )
}

export default ProfileChangeImage
