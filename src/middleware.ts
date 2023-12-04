// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { refreshTokenApi } from './pages/api/auth/refresh'
import { fetchPost } from './server/utils'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - assets (image)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - mockServiceWorker (msw)
     */
    '/((?!api|assets/*|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const response = NextResponse.next()
  const accessToken = req.cookies.get('accessToken')

  if (pathname.startsWith('/protected') || pathname === '/') {
    if (!accessToken) {
      const res = await fetchPost({
        url: refreshTokenApi,
        headers: req.headers,
      })

      const authHeader = res.headers.get('authorization') || ''
      const token = authHeader.split(' ')[1] ?? ''

      if (!token && res.status !== 200) {
        const url = req.nextUrl.clone()
        url.pathname = '/guest/auth/login'
        return response
      }

      response.cookies.set({
        name: 'accessToken',
        value: token,
        path: '/',
        httpOnly: true,
        maxAge: 600,
      })
    }
  }

  return response
}
