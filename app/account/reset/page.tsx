import ForgotPassword from '@/components/auth/ForgotPassword'
import { Suspense } from 'react'

interface IReset {
  searchParams: { reset_url?: string }
}

const Reset = ({ searchParams }: IReset) => {
  const resetUrl = decodeURIComponent(searchParams.reset_url || '')
  return (
    <Suspense>
      <ForgotPassword resetUrl={resetUrl}/>
    </Suspense>
  )
}

export default Reset
