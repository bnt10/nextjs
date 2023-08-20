import process from 'process'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'
import { schemduleDateState } from '@/selectors/dateSelector'

import CalendarNavigation from './CalendarNavigation'
import ModalActionButtons from './ModalActionButtons'
import StyledCalendar from './StyledCalendar'
import TimePicker from './TimePicker'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CalendarModal() {
  const [schemduleDate, setSchemduleDate] = useRecoilState(schemduleDateState)
  const [date, setDate] = useState<Value>(schemduleDate)
  const [, setModalContent] = useRecoilState(modalContentState)

  const onDateChangeHandler = (value: Value) => {
    setDate(value)
  }
  const onSaveHandler = () => {
    if (date instanceof Date) {
      setSchemduleDate(date)
      setModalContent(<TimePicker />)
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
