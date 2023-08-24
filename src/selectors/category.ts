import { DefaultValue, selector } from 'recoil'

import { SchemduleState } from '@/atoms/scheduleAtom'

export const scheduleCategoryState = selector({
  key: 'scheduleCategoryState',
  get: ({ get }) => {
    const { category } = get(SchemduleState)

    return category
  },
  set: ({ set }, newCategory) => {
    set(SchemduleState, (preState) => {
      return {
        ...preState,
        category:
          newCategory instanceof DefaultValue ? preState.category : newCategory,
      }
    })
  },
})
