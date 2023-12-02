// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 인증이 필요한 경로를 정의합니다.
  if (pathname.startsWith('/protected')) {
    // 인증 로직을 구현합니다.
    const isAuthenticated = true

    if (!isAuthenticated) {
      // 인증되지 않은 경우, 로그인 페이지로 리디렉션합니다.
      return NextResponse.redirect('/login')
    }
  }

  return NextResponse.next()
}
