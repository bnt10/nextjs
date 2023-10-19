export const handlers = [
  // rest.get('/api/account/user', (_, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       user: {
  //         id: 1,
  //       },
  //     })
  //   )
  // }),
  // rest.get('/api/todo/:id', (req, res, ctx) => {
  //   const { id } = req.params
  //   const todoTask = MockTodoList.find((todo) => {
  //     return todo.id === id
  //   })
  //   return res(ctx.status(200), ctx.json(todoTask))
  // }),
  // rest.get('/api/todo', (req, res, ctx) => {
  //   const startDateParam = req.url.searchParams.get('startDate')
  //   const endDateParam = req.url.searchParams.get('endDate')
  //   let currentDate: moment.Moment
  //   let endDate: moment.Moment
  //   if (startDateParam) {
  //     currentDate = moment(startDateParam, 'ddd, DD MMM YYYY HH:mm:ss [GMT]')
  //     if (endDateParam) {
  //       endDate = moment(endDateParam, 'ddd, DD MMM YYYY HH:mm:ss [GMT]')
  //     } else {
  //       endDate = moment(currentDate).add(ADD_DATE, 'days')
  //     }
  //   } else {
  //     currentDate = moment().subtract((SIDE_DAY_COUNT - 1) / 2, 'days')
  //     endDate = moment().add((SIDE_DAY_COUNT - 1) / 2, 'days')
  //   }
  //   const filteredTodoList = MockTodoList.filter((todoItem) => {
  //     const targetDate = moment(todoItem.targetDay, 'YYYY-MM-DD hh:mm A')
  //     return (
  //       targetDate.isSameOrAfter(currentDate) &&
  //       targetDate.isSameOrBefore(endDate)
  //     )
  //   })
  //   return res(ctx.status(200), ctx.json(filteredTodoList))
  // }),
]
