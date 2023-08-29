import { rest } from 'msw'

import { MockTodoList } from './data/MockTodoList'

export const handlers = [
  rest.get('/api/account/user', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 1,
        },
      })
    )
  }),

  rest.get('/api/todoLists/:id', (req, res, ctx) => {
    const { id } = req.params
    const currentDay = req.url.searchParams.get('currentDay')

    return res(
      ctx.status(200),
      ctx.json({
        todoList: {
          id,
          currentDay, // 추가한 필드
          // other fields
        },
      })
    )
  }),
  rest.get('/api/todoLists', (_, res, ctx) => {
    // const { id } = req.params
    // const currentDay = req.url.searchParams.get('currentDay')

    return res(ctx.status(200), ctx.json(MockTodoList))
  }),
]
