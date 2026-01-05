import ForgotPassword from '@/components/auth/ForgotPassword'

interface IReset {
  searchParams: Promise<{ reset_url?: string }>
}

const Reset = async ({ searchParams }: IReset) => {
  const resetUrl = decodeURIComponent((await searchParams).reset_url || '')
  return (
      <ForgotPassword resetUrl={resetUrl}/>
  )
}

export default Reset
