import { rest } from 'msw'

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
]
