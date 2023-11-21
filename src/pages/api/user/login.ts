import db from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { LoginUserType } from '@/types/users'

export const UserService = '/api/user'

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  await db.read()

  try {
    const { userData } = req.body
    const { password, userName } = userData as LoginUserType

    const authenticatedUser = db.data.users.find(
      (user) => user.userName === userName && user.password === password
    )
    if (!authenticatedUser) {
      return res.status(400).json({ message: 'Incorrect user information.' })
    }

    return res.status(200).json({ message: 'You have successfully Login' })
  } catch (error) {
    return res.status(500).json({ message: 'Interanl Server Error' })
  }
}
const requestHandelrs = {
  POST: handlePostRequest,
} as const

type RequestHandlerKeys = keyof typeof requestHandelrs

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === undefined) {
    return res.status(405).end()
  }

  const requestHandler = requestHandelrs[method as RequestHandlerKeys]

  return requestHandler(req, res) ?? res.status(405).end()
}
