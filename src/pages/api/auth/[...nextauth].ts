import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'googleCustom',
      credentials: {},
      authorize: async (_) => {
        try {
          return {
            id: 'jin',
          }
        } catch (e) {
          return null // or throw an error
        }
      },
    }),
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
      return token
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/auth`
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
