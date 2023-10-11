import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'

import type { TodoItem } from '@/types/todoList'

type UseDynamicRecoilStateProps = {
  stateKey: RecoilState<any>
  func?: any
}
export const useDynamicRecoilState = ({
  stateKey,
  func,
}: UseDynamicRecoilStateProps) => {
  const [state, setState] = useRecoilState(stateKey)

  const getExtendedState = () => {
    if (func) {
      return func(state)
    }
    return state
  }

  const setExtendedState = (newState: TodoItem) => {
    setState((prevState: any) => {
      return {
        ...newState,
        ...prevState,
      }
    })
  }

  return [getExtendedState(), setExtendedState]
}
