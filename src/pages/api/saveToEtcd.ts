import { Etcd3 } from 'etcd3'
import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid'

import type { TodoItem } from '@/types/todoList'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const client = new Etcd3()
  const uniqueId = uuidv4()
  try {
    const { task } = req.body
    const addTask: TodoItem = {
      id: uniqueId,
      userId: 'jin',
      ...task,
    }

    await client.put('task').value(JSON.stringify(addTask))
    res.status(200).json({ message: 'Saved to etcd' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    client.close()
  }
}
