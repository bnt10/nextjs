import process from 'process'
import { useState } from 'react'
import type { Value } from 'react-calendar/dist/cjs/shared/types'
import type { RecoilState } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { useDynamicRecoilState } from '@/hooks/useDynamicRecoilState'
import { scheduleDateDataState } from '@/selectors/timeSelector'

import CalendarNavigation from './CalendarNavigation'
import ModalActionButtons from './ModalActionButtons'
import StyledCalendar from './StyledCalendar'
import TimePicker from './TimePicker'

type CalendarModalProps = {
  stateKey?: RecoilState<any>
  getState?: any
  setState?: any
}

export default function CalendarModal({
  stateKey = scheduleDateDataState,
  getState,
  setState,
}: CalendarModalProps) {
  const [scheduleDate] = useDynamicRecoilState({
    stateKey,
    getState,
  })

  const [date, setDate] = useState(scheduleDate.date)

  const setModalContent = useSetRecoilState(modalContentState)

  const onDateChangeHandler = (value: Value) => {
    setDate(value)
  }
  const onSaveHandler = () => {
    if (date instanceof Date) {
      setModalContent(
        <TimePicker
          stateKey={stateKey}
          currentDate={date}
          getState={getState}
          setState={setState}
        />
      )
    }
  }

  const onCancleHandler = () => {
    setModalContent(null)
  }

  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className="bg-footer-gray">
        <StyledCalendar
          locale={process.env.NEXT_PUBLIC_LOCALE}
          calendarType={'gregory'}
          onChange={onDateChangeHandler}
          value={date}
          next2Label={null}
          prev2Label={null}
          navigationLabel={CalendarNavigation}
        />
        <ModalActionButtons
          saveTitle={'Choose Time'}
          saveHandler={onSaveHandler}
          cancelHandler={onCancleHandler}
          cancelTitle="Cancel"
        />
      </div>
    </div>
  )
}
