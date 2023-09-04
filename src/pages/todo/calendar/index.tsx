import CustomCalendar from '@/component/todo/calendarPage/CustomCalendar'

export default function TodoCalendar() {
  // const onDateChangeHandler = () => {}
  // const [schemduleDate, setSchemduleDate] = useRecoilState(schemduleDateState)
  // const [date, setDate] = useState<Value>(schemduleDate)
  // return (
  //   <CalendarPageLayout>
  //     <StyledCalendar
  //       locale={process.env.NEXT_PUBLIC_LOCALE}
  //       calendarType={'gregory'}
  //       onChange={onDateChangeHandler}
  //       value={date}
  //       next2Label={null}
  //       prev2Label={null}
  //       navigationLabel={CalendarNavigation}
  //     />
  //   </CalendarPageLayout>
  // )
  return (
    <div>
      <CustomCalendar />
    </div>
  )
}
