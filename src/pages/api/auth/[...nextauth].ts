import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      console.log(token, 'asdasssss')
      return token
    },
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl, 'asdas')
      return baseUrl
    },
  },
  theme: {
    colorScheme: 'light',
  },
  pages: {
    error: '/auth/error', // Error code passed in query string as ?error=
  },
}

export default NextAuth(authOptions)
