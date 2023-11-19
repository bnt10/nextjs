import type { Url } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

import ModalHeader from '../todo/modal/common/ModalHeader'
import ModalLayout from '../todo/modal/common/ModalLayout'
import ModalActionButtons from '../todo/modal/ModalActionButtons'

interface Props {
  message: string
  nextPath?: Url
}

export default function MessageModal({ message, nextPath }: Props) {
  const router = useRouter()

  return (
    <ModalLayout>
      <ModalHeader title={'완료'} />
      <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
        {message}
      </div>
      <ModalActionButtons
        saveTitle={'확인'}
        saveHandler={() => {
          router.replace(nextPath as Url)
        }}
      />
    </ModalLayout>
  )
}
