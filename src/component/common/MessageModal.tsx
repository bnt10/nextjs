import type { Url } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'

import ModalLayout from '../todo/modal/common/ModalLayout'
import ModalActionButtons from '../todo/modal/ModalActionButtons'

interface Props {
  message: string
  nextPath?: Url | null
  confirmTitle: string
}

export default function MessageModal({
  confirmTitle,
  message,
  nextPath,
}: Props) {
  const router = useRouter()
  const setModalContent = useSetRecoilState(modalContentState)
  return (
    <ModalLayout>
      <div className="flex flex-wrap items-center px-4pxr pt-22pxr">
        <span className="mb-10pxr flex w-full justify-center text-center text-sm text-white/[0.87]">
          {message}
        </span>
      </div>
      <ModalActionButtons
        saveTitle={confirmTitle}
        saveHandler={() => {
          if (nextPath) {
            router.replace(nextPath)
          }

          setModalContent(null)
        }}
      />
    </ModalLayout>
  )
}
