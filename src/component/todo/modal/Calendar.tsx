import { useState } from 'react'

import CalendarNavigation from './CalendarNavigation'
import ModalActionButtons from './ModalActionButtons'
import StyledCalendar from './StyledCalendar'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CalendarModal() {
  const [value, onChange] = useState<Value>(new Date())

  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className="bg-footer-gray">
        <StyledCalendar
          locale={'en'}
          calendarType={'gregory'}
          onChange={onChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          navigationLabel={CalendarNavigation}
        />
        <ModalActionButtons
          saveTitle={'Choose Time'}
          saveHandler={() => {}}
          cancelHandler={() => {}}
          cancelTitle="Cancel"
        />
      </div>
    </div>
  )
}
