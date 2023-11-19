import db from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import type { CreateUserType } from '@/types/users'

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  await db.read()
  const uniqueId = uuidv4()

  try {
    const { userData } = req.body
    const { confirmPassword, password, userName } = userData as CreateUserType
    if (confirmPassword !== password) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }
    const exsistingName = db.data?.users.find((t) => t.userName === userName)
    if (exsistingName) {
      return res.status(400).json({ message: 'User Name exists' })
    }

    db.data.users.push({ ...userData, id: uniqueId })
    await db.write()

    return res
      .status(200)
      .json({ message: 'You have successfully registered ' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
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
