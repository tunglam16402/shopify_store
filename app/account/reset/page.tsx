import ForgotPassword from '@/components/auth/ForgotPassword'
import { Suspense } from 'react'

interface IReset {
  searchParams: Promise<{ reset_url?: string }>
}

const Reset = async ({ searchParams }: IReset) => {
  const resetUrl = decodeURIComponent((await searchParams).reset_url || '')
  return (
    <Suspense>
      <ForgotPassword resetUrl={resetUrl}/>
    </Suspense>
  )
}

export default Reset
