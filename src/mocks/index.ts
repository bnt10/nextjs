export async function initMocks() {
  try {
    if (typeof window === 'undefined') {
      const { server } = await import('./server')
      server.listen({
        onUnhandledRequest: 'bypass',
      })
      process.on('exit', () => {
        server.close()
      })
    } else {
      const { worker } = await import('./browser')
      worker.start({ onUnhandledRequest: 'bypass' })
    }
  } catch (error) {
    console.error('Error initializing MSW:', error)
  }
}
