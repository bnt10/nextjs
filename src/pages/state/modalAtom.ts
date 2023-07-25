import { atom } from 'recoil'

export const modalContentState = atom<React.ReactNode | null>({
  key: 'modalContentState',
  default: null,
})
