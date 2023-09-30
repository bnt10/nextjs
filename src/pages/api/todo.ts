import type { NextApiRequest, NextApiResponse } from 'next'

import { MockTodoList } from '@/mocks/data/MockTodoList'
import { newDate } from '@/utils/convert'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { date } = req.query

    let filteredData = MockTodoList

    if (date) {
      filteredData = MockTodoList.filter((item) => {
        return item.targetDay === newDate(date as string)
      })
    }

    res.status(200).json(filteredData)
  }
}

export default handler
