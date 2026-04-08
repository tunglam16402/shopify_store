import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/account/login', 
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token

        if (profile) {
          token.name = profile.name
          token.email = profile.email
        //   token.picture = profile.picture
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture as string | null | undefined
      }

      return session
    },
  },
})

export { handler as GET, handler as POST }