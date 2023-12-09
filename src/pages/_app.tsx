import '../styles/global.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { ErrorBoundary } from '@/component/common/ErrorBoundary'
import NestedModal from '@/component/common/NestedModal'
import { ModalProvider } from '@/contexts/ModalContext'
import Layout from '@/layouts'
import { initMocks } from '@/mocks'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  initMocks()
}
// Create a client
const queryClient = new QueryClient()

type RootProps = AppProps & {
  pageProps: AppProps['pageProps'] & {
    dehydratedState: any
    session: Session
  }
}
const MyApp = ({ Component, pageProps: { ...pageProps } }: RootProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ErrorBoundary>
            <ModalProvider>
              <Layout>
                <Component {...pageProps} />
                <NestedModal />
              </Layout>
            </ModalProvider>
          </ErrorBoundary>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
