interface Props {
  label: string
}
export default function CalendarNavigation({ label }: Props) {
  const [monthlabel, yearLabel] = label.split(' ')

  return (
    <div>
      <div className={'text-sm leading-6 text-white/[87]'}>{monthlabel}</div>
      <div className={'text-xsm leading-6 text-[#AFAFAF]'}>{yearLabel}</div>
    </div>
  )
}
