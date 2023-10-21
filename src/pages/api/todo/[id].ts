import db from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET 요청을 처리하는 함수
async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  // 현재 날짜
  await db.read()
  const { id } = req.query
  const todoTask = db.data.tasks.find((todo) => {
    return todo.id === id
  })

  return res.status(200).json(todoTask)
}

// POST 요청을 처리하는 함수
async function handlePatchRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).end()
  }

  try {
    const { id } = req.query
    const updateTaskId = id as string
    const { data: updateTask } = req.body

    db.chain.get('tasks').find({ id: updateTaskId }).assign(updateTask).value()

    await db.write()

    return res.status(200).json({ message: 'Saved to LowDB' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const requestHandlers = {
  GET: handleGetRequest,
  PATCH: handlePatchRequest,
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
