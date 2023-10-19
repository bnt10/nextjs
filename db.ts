import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'

type Data = {
  tasks: any[]
}

const adapter = new JSONFile<Data>(path.join(__dirname, 'db.json'))

export const defaulDBtData = { tasks: [] }
const db = new Low(adapter, defaulDBtData)

export default db
