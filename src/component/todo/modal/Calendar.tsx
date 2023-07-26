import 'react-calendar/dist/Calendar.css'

import { useState } from 'react'
import Calendar from 'react-calendar'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CalendarModal() {
  const [value, onChange] = useState<Value>(new Date())
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div>
        <Calendar
          locale={'en'}
          calendarType={'gregory'}
          className={'w-100pxr'}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  )
}
