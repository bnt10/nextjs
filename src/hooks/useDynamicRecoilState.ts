import type { RecoilState } from 'recoil'
import { useRecoilState } from 'recoil'

type UseDynamicRecoilStateProps = {
  stateKey: RecoilState<any>
  getState?: any
  setState?: any
}
export const useDynamicRecoilState = ({
  stateKey,
  getState,
  setState,
}: UseDynamicRecoilStateProps) => {
  const [recoilState, recoilSetState] = useRecoilState(stateKey)

  const getExtendedState = () => {
    if (getState) {
      return getState(recoilState)
    }
    return recoilState
  }

  const setExtendedState = (newState: any) => {
    if (setState) {
      setState(newState, recoilSetState)
      return
    }
    recoilSetState(newState)
  }

  return [getExtendedState(), setExtendedState]
}
