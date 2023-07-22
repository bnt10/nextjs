import '../styles/global.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ModalProvider } from '@/contexts/ModalContext'
import Layout from '@/layouts'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks')
}

// Create a client
const queryClient = new QueryClient()

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </SessionProvider>
  </QueryClientProvider>
)

export default MyApp
