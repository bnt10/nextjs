type TimeType = 'H' | 'M' | 'S'
interface Props {
  timeType: TimeType
}

export default function TimeRoller({ timeType }: Props) {
  return <>{timeType}</>
}
