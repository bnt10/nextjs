import { useSession } from 'next-auth/react'

const OAuthLogin = () => {
  const { data: session, status } = useSession()

  console.log(session, status)
  return <div>Login access</div>
}

export default OAuthLogin
