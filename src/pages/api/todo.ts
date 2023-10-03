import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'

import { calendarConfig } from '@/config/calendar'
import { MockTodoList } from '@/mocks/data/MockTodoList'

const { SIDE_DAY_COUNT } = calendarConfig
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // 현재 날짜
    const currentDate = moment()

    // 필터링 조건
    const filteredTodoList = MockTodoList.filter((todoItem) => {
      const targetDate = moment(todoItem.targetDay, 'YYYY-MM-DD hh:mm A')
      const daysDifference = targetDate.diff(currentDate, 'days')
      return (
        daysDifference >= -SIDE_DAY_COUNT && daysDifference <= SIDE_DAY_COUNT
      )
    })
    res.status(200).json(filteredTodoList)
  }
}

export default handler
