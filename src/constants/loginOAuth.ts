import GitHubLoginButton from '@/component/auth/GitHubLoginButton'
import GoogleLoginButton from '@/component/auth/GoogleLoginButton'
import type { ProviderConfig } from '@/types/oauthProvider'

export const LoginOAuth: Record<string, ProviderConfig> = {
  google: {
    id: 'googleLogin',
    component: GoogleLoginButton,
  },
  github: {
    id: 'githubLogin',
    component: GitHubLoginButton,
  },
}
