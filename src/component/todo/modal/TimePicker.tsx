import { useRef } from 'react'
import type { RecoilState } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { useDynamicRecoilState } from '@/hooks/useDynamicRecoilState'
import { scheduleDateDataState } from '@/selectors/timeSelector'
import type { TimeData } from '@/types/schedule'
import { convertDateToObject } from '@/utils/date'

import ModalActionButtons from './ModalActionButtons'
import TimeRoller from './TimeRoller'

type TimePickerProps = {
  currentDate: Date
  stateKey?: RecoilState<any>
  getState?: any
  setState?: any
}

export default function TimePicker({
  currentDate,
  stateKey = scheduleDateDataState,
  getState,
  setState,
}: TimePickerProps) {
  const [schemduleState, setSchemduleState] = useDynamicRecoilState({
    stateKey,
    getState,
    setState,
  })
  const timeRef = useRef<TimeData>({})
  const setModalContent = useSetRecoilState(modalContentState)

  const { hour, minute, amPm } = schemduleState.time
  const onChange = (time: TimeData) => {
    timeRef.current = {
      ...timeRef.current,
      ...time,
    }
  }

  const onSaveHandler = () => {
    setSchemduleState({
      date: convertDateToObject(currentDate),
      time: timeRef.current,
    })
    setModalContent(null)
  }

  const onCancleHandler = () => {
    setModalContent(null)
  }

  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className="h-206pxr w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        <div className="flex items-center justify-center border-b border-gray-900 py-10pxr">
          <span className="text-white">Choose Time</span>
        </div>
        <div className="flex h-106pxr items-center px-43pxr py-21pxr">
          <div className="mr-13pxr">
            <TimeRoller
              timeType={'hour'}
              onTimeChange={onChange}
              value={hour}
            />
          </div>
          <div className="mr-14pxr">:</div>
          <div className="mr-16pxr">
            <TimeRoller
              timeType={'minute'}
              onTimeChange={onChange}
              value={minute}
            />
          </div>
          <div>
            <TimeRoller
              timeType={'amPm'}
              onTimeChange={onChange}
              value={amPm}
            />
          </div>
        </div>
        <ModalActionButtons
          saveTitle={'Save'}
          saveHandler={onSaveHandler}
          cancelTitle={'Cancel'}
          cancelHandler={onCancleHandler}
        />
      </div>
    </div>
  )
}
