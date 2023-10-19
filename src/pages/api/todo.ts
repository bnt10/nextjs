import db from 'db'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { calendarConfig } from '@/config/calendar'
import { MockTodoList } from '@/mocks/data/MockTodoList'

const { SIDE_DAY_COUNT } = calendarConfig

// GET 요청을 처리하는 함수
async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  // 현재 날짜
  await db.read()

  const currentDate = moment()

  // 필터링 조건
  const filteredTodoList = MockTodoList.filter((todoItem) => {
    const targetDate = moment(todoItem.targetDay, 'YYYY-MM-DD hh:mm A')
    const daysDifference = targetDate.diff(currentDate, 'days')
    return daysDifference >= -SIDE_DAY_COUNT && daysDifference <= SIDE_DAY_COUNT
  })

  return res.status(200).json(filteredTodoList)
}

// POST 요청을 처리하는 함수
async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  await db.read()

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const uniqueId = uuidv4()

  try {
    const { task } = req.body

    // 이미 같은 id를 가진 task가 있는지 확인
    const existingTask = db.data?.tasks.find((t: any) => t.id === uniqueId)
    if (existingTask) {
      return res.status(400).json({ message: 'ID already exists' })
    }

    // tasks 배열에 새로운 task 추가
    if (db.data) {
      db.data.tasks.push({ ...task, id: uniqueId })
      await db.write()
    }

    return res.status(200).json({ message: 'Saved to LowDB' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const requestHandlers = {
  GET: handleGetRequest,
  POST: handlePostRequest,
} as const

type requestHandlersKeys = keyof typeof requestHandlers

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === undefined) {
    return res.status(405).end()
  }
  const requestHandler = requestHandlers[method as requestHandlersKeys]

  return requestHandler(req, res) ?? res.status(405).end()
}
