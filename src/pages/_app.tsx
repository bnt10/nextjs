import '../styles/global.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import Layout from '@/layouts'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks')
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => (
  <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
)

export default MyApp
