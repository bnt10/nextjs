import db from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidV4 } from 'uuid'

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  await db.read()
  const uniqueId = uuidV4()

  try {
    const { userData } = req.body

    const existingName = db.data?.users.find(
      (t) => t.userName === userData.userName
    )
    if (existingName) {
      return res.status(400).json({ message: 'User Name exists' })
    }

    db.data.users.push({ ...userData, id: uniqueId })

    return res
      .status(200)
      .json({ message: 'You have successfully registered ' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const requestHandlers = {
  POST: handlePostRequest,
} as const

type RequestHandlerKeys = keyof typeof requestHandlers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === undefined) {
    return res.status(405).end()
  }

  const requestHandler = requestHandlers[method as RequestHandlerKeys]

  return requestHandler(req, res) ?? res.status(405).end()
}
