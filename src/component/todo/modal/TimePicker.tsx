import { useRef } from 'react'
import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { scheduleTimeState } from '@/selectors/timeSelector'
import type { TimeData } from '@/types/schedule'

import ModalActionButtons from './ModalActionButtons'
import TimeRoller from './TimeRoller'

export default function TimePicker() {
  const timeRef = useRef<TimeData>({})
  const [, setModalContent] = useRecoilState(modalContentState)

  const [schemduleState, setSchemduleState] = useRecoilState(scheduleTimeState)
  const onChange = (time: TimeData) => {
    timeRef.current = {
      ...timeRef.current,
      ...time,
    }
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
              value={schemduleState.hour}
            />
          </div>
          <div className="mr-14pxr">:</div>
          <div className="mr-16pxr">
            <TimeRoller
              timeType={'minute'}
              onTimeChange={onChange}
              value={schemduleState.minute}
            />
          </div>
          <div>
            <TimeRoller
              timeType={'amPm'}
              onTimeChange={onChange}
              value={schemduleState.amPm}
            />
          </div>
        </div>
        <ModalActionButtons
          saveTitle={'Save'}
          saveHandler={() => {
            setSchemduleState(timeRef.current)
          }}
          cancelTitle={'Cancel'}
          cancelHandler={() => {
            setModalContent(null)
          }}
        />
      </div>
    </div>
  )
}
