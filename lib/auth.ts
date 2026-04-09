/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { type NextAuthOptions, type Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { generateShopifyPassword } from '@/lib/shopify-password'
import { createCustomerAccessToken } from '@/shopify/auth/use-login'
import { createCustomer } from '@/shopify/auth/use-signup'
import { cookies } from 'next/headers'

async function getShopifyAccessToken(
  email: string,
  name?: string
): Promise<string | null> {
  const password = generateShopifyPassword(email)

  const loginResult = await createCustomerAccessToken({ email, password })
  if (loginResult.success && loginResult.accessToken) {
    return loginResult.accessToken
  }

  const firstName = name?.split(' ')[0] ?? ''
  const lastName = name?.split(' ').slice(1).join(' ') ?? ''

  const createResult = await createCustomer({
    email,
    password,
    lastName,
    firstName,
  })

  if (!createResult.success) {
    console.error('Shopify customerCreate errors:', createResult.errors)
    return null
  }

  const retryLogin = await createCustomerAccessToken({ email, password })
  return retryLogin.success ? (retryLogin.accessToken ?? null) : null
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/account/login' },
  callbacks: {
    async jwt({ token, profile, account }) {
      if (account?.provider === 'google' && profile?.email) {
        token.name = profile.name
        token.email = profile.email
        token.provider = 'google'

        const shopifyToken = await getShopifyAccessToken(
          profile.email,
          profile.name
        )
        token.shopifyAccessToken = shopifyToken ?? null

        if (shopifyToken) {
          const cookieStore = await cookies()
          cookieStore.set('shopify_customer_token', shopifyToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            priority: 'high',
          })
        }
      }
      return token
    },

    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.name = token.name as string | null | undefined
        session.user.email = token.email as string | null | undefined
      }
      // Expose shopifyAccessToken to session
      ;(session as any).shopifyAccessToken = token.shopifyAccessToken ?? null
      return session
    },
  },
}

export const handler = NextAuth(authOptions)
