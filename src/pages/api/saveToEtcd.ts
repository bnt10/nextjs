import { Etcd3 } from 'etcd3'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const client = new Etcd3()

  try {
    const { task } = req.body
    await client.put('task').value(JSON.stringify(task))
    res.status(200).json({ message: 'Saved to etcd' })
  } catch (error) {
    console.error('An error occurred:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    client.close()
  }
}
