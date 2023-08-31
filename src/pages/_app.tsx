import '../styles/global.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import NestedModal from '@/component/common/NestedModal'
import { ModalProvider } from '@/contexts/ModalContext'
import Layout from '@/layouts'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks')
}
// Create a client
const queryClient = new QueryClient()

type RootProps = AppProps & {
  pageProps: AppProps['pageProps'] & {
    dehydratedState: any
    session: Session
  }
}
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: RootProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <ModalProvider>
              <Layout>
                <Component {...pageProps} />
                <NestedModal />
              </Layout>
            </ModalProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
