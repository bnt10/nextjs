/* eslint-disable import/no-extraneous-dependencies */
import cookieParser from 'cookie-parser'
import db from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { verifyAccessToken } from '@/server/auth'
import type { CreateUserType } from '@/types/users'

export const API_USER = 'api/user'

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  await db.read()
  const uniqueId = uuidv4()

  try {
    const { userData } = req.body
    const { confirmPassword, password, userName } = userData as CreateUserType
    if (confirmPassword !== password) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }
    const existingName = db.data?.users.find((t) => t.userName === userName)
    if (existingName) {
      return res.status(400).json({ message: 'User Name exists' })
    }

    db.data.users.push({ ...userData, id: uniqueId })
    await db.write()
    return res
      .status(200)
      .json({ message: 'You have successfully registered ' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function handleGETRequest(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.cookies
  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized Access' })
  }
  const invalidateToken = verifyAccessToken(accessToken)
  if (!invalidateToken) {
    return res.status(403).json({ message: 'Forbidden Access' })
  }

  await db.read()
  const existingName = db.data?.users.find(
    (t) => t.userName === invalidateToken.userName
  )

  if (!existingName) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  const userInfo = {
    id: existingName.id,
    name: existingName.userName,
  }

  return res.status(200).json({ user: userInfo })
}
const requestHandlers = {
  POST: handlePostRequest,
  GET: handleGETRequest,
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
  cookieParser()(req as any, res as any, () => {})

  const requestHandler = requestHandlers[method as RequestHandlerKeys]

  return requestHandler(req, res) ?? res.status(405).end()
}
