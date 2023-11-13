import type { ReactNode } from 'react'
import React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

type TestWrapperProps = {
  children: ReactNode
  session?: any
  dehydratedState?: any
}

export const TestWrapper = ({
  children,

  dehydratedState,
}: TestWrapperProps) => {
  const queryClient = new QueryClient()

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
