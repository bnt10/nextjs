// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .json({ isValid: false, error: 'No token provided' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return res.status(200).json({ isValid: true })
  } catch (error) {
    return res.status(401).json({ isValid: false })
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
