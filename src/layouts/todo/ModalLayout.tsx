import type { LayoutProps } from './type'

export default function ModalLayout({ children }: LayoutProps) {
  return <div className="foldable:w-375pxr">{children}</div>
}
