import 'react-calendar/dist/Calendar.css'

import { useState } from 'react'
import Calendar from 'react-calendar'

import CalendarNavigation from './CalendarNavigation'
import styles from './calendarStyle.module.css'

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
          className={styles['react-calendar']}
          onChange={onChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          navigationLabel={CalendarNavigation}
        />
      </div>
    </div>
  )
}
