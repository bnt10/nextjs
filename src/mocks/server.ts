import { setupServer } from 'msw/node'

import { handlers } from './handlers'

export const server = setupServer(...handlers)
server.listen({
  onUnhandledRequest: 'bypass',
})

export function logMswState() {
  return server
}
