import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'

type Data = {
  tasks: any[]
}
const rootDir = process.cwd()

const adapter = new JSONFile<Data>(path.join(rootDir, 'db.json'))

export const defaulDBtData = { tasks: [] }
const db = new Low(adapter, defaulDBtData)

export default db
