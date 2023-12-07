// eslint-disable-next-line import/no-extraneous-dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

import { generateAccessToken, verifyRefreshToken } from '@/server/auth'

export const refreshTokenApi = '/api/auth/refresh'

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    res.status(401).json({ message: 'No refresh token provided' })
    return
  }

  const userData = verifyRefreshToken(refreshToken)
  if (userData) {
    const { userName } = userData as any
    const newAccessToken = generateAccessToken(userName)

    res.setHeader('Authorization', `Bearer ${newAccessToken}`)

    res.status(200).json({ message: 'refresh token' })
  } else {
    res.status(401).json({ message: 'Invalid refresh token' })
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
