import Image from 'next/image'

import logoBg from '@/public/assets/images/app-login-bg.png'

const AuthLogin = () => {
  // const LoginOAuth: Record<string, ProviderConfig> = {
  //   google: {
  //     id: 'googleLogin',
  //     component: GoogleLoginButton,
  //   },
  // }

  return (
    <>
      <div className="relative flex h-screen flex-col items-center ">
        <Image
          src={logoBg}
          alt="login-bg"
          className="absolute top-[-32px]  z-[-10] w-390pxr bg-gray-900 object-cover"
        />
        <p className="relative mt-56pxr text-left text-lg text-white">
          Welcome to
        </p>
        <p className="relative mt-107pxr h-37pxr w-248pxr text-left text-4xl font-bold text-white">
          Wild Alliance
        </p>

        {/* <div>
          {Object.values(LoginOAuth).map(
            ({ id, component: OAuthLoginButton }) => (
              <OAuthLoginButton key={id} />
            )
          )}
        </div> */}
      </div>
    </>
  )
}

export default AuthLogin
