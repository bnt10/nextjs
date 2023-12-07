import { atom } from 'recoil'

export type AuthStateType = {
  accessToken: null
}
export const AuthState = atom<AuthStateType>({
  key: 'AuthState',
  default: {
    accessToken: null,
  },
})
