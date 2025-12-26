import ActivateForm from '@/components/auth/ActivateForm'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

interface ActivatePageProps {
  params: Promise<{
    id: string
    token: string
  }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const Activate = async ({ params }: ActivatePageProps) => {
  'use cache'
  cacheLife('hours')

  const { id, token } = await params
  const activationUrl =
    id && token ? `${baseUrl}/account/activate/${id}/${token}` : ''

  return (
    <>
      <h1 className="text-3xl text-center sm:text-4xl font-bold text-slate-900">
        Activate Account
      </h1>
      <Suspense>
        <ActivateForm activationUrl={activationUrl} />
      </Suspense>
    </>
  )
}

export default Activate
