import db from 'db'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

import { generateAccessToken, generateRefreshToken } from '@/server/auth'
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
    const accessToken = generateAccessToken(userName)
    const refreshToken = generateRefreshToken(userName)
    res.setHeader('Set-Cookie', [
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800`,
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900`,
    ])

    return res
      .status(200)
      .json({ accessToken, message: 'You have successfully Login' })
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
