import { LoginOAuth } from '@/constants/loginOAuth'

const Index = () => {
  return (
    <div className="h-screen">
      <div className="h-full w-320pxr bg-black text-white">
        <div className="mobile:bg-slate-300 foldable:bg-red-500">
          {Object.values(LoginOAuth).map(
            ({ id, component: OAuthLoginButton }) => (
              <OAuthLoginButton key={id} />
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
