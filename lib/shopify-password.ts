import crypto from 'crypto'

export function generateShopifyPassword(email: string): string {
  const secret = process.env.AUTH_SECRET!
  return crypto
    .createHmac('sha256', secret)
    .update(email.toLowerCase())
    .digest('base64')
    .slice(0, 32)
}