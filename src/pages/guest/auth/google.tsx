import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const GoggleCallback = () => {
  const { status } = useSession()
  const router = useRouter()

  const { access_token } = router.query
  useEffect(() => {
    if (access_token && status === 'authenticated') {
      // 인증이 이미 완료된 경우 다음 페이지로 이동합니다.
      router.push('/auth/')
    } else if (access_token && status === 'unauthenticated') {
      // 인증이 완료되지 않은 경우 signIn 콜백을 사용하여 인증을 처리합니다.
      signIn('googleCustoms', { callbackUrl: '/', access_token })
    }
  }, [access_token, status])
  return <div>Loading...!</div>
}

export default GoggleCallback
