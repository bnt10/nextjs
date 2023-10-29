// eslint-disable-next-line import/no-extraneous-dependencies
import lodash from 'lodash'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'

import type { TodoItemServer } from '@/types/todoList'

type Data = {
  tasks: TodoItemServer[]
}

const rootDir = process.cwd()

const defaultDBtData: Data = { tasks: [] }

class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const adapter = new JSONFile<Data>(path.join(rootDir, 'db.json'))
const db = new LowWithLodash(adapter, defaultDBtData)
const initDb = async () => {
  await db.read()
}

initDb()

export default db
