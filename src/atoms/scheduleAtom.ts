import { atom } from 'recoil'

type TimeType = 'H' | 'M' | 'AmPm'
type TimeData = {
  [x in TimeType]?: string
}
type DateType = 'year' | 'month' | 'day'
type DateData = {
  [x in DateType]: number
}

type SchemduleStateType = {
  time: TimeData
  date: DateData | null
  priority: number
}

export const SchemduleState = atom<SchemduleStateType>({
  key: 'SchemduleState',
  default: {
    time: { H: '00', M: '00', AmPm: 'AM' },
    date: null,
    priority: 1,
  },
})
