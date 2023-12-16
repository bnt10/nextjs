import { selector } from 'recoil'

import { UserState } from '@/atoms/userAtom'
import { getUserInfo } from '@/services/users/api'

export const userStateSelector = selector({
  key: 'UserStateSelectorKey',
  get: async ({ get }) => {
    try {
      const user = get(UserState)
      if (!user.name || !user.userId) {
        const res = await getUserInfo()

        const { id, name } = res.user

        return {
          userId: id,
          name,
        }
      }
      return {
        userId: user.userId,
        name: user.name,
      }
    } catch (error) {
      return {
        userId: '',
        name: '',
      }
    }
  },
})
