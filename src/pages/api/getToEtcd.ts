// api/getFromEtcd.ts

import { Etcd3 } from 'etcd3'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const client = new Etcd3()

  try {
    const task = await client.get('task').string()
    res.status(200).json({ task })
  } catch (error) {
    console.error('An error occurred:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    client.close()
  }
}
