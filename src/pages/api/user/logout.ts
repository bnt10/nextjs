import db from 'db'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

export const UserService = '/api/user'

async function handlePostRequest(_: NextApiRequest, res: NextApiResponse) {
  await db.read()

  try {
    res.setHeader('Set-Cookie', [
      'refreshToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ])

    return res.status(200).json({ message: 'You have successfully Logout' })
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
