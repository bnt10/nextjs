export type TimeType = 'hour' | 'minute' | 'amPm'
export type TimeData = {
  [x in TimeType]?: string
}
export type DateType = 'year' | 'month' | 'day'
export type DateData = {
  [x in DateType]: number
}
export type TimeZone = string
export type ScheduleStateType = {
  time: TimeData
  date: DateData
  timeZone: TimeZone
  priority: number
  category: string
}

export type DateWidthTimeType = {
  time: TimeData
  date: DateData | Date
}
