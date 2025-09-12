import ActivateForm from '@/components/auth/ActivateForm'

interface ActivatePageProps {
  params: Promise<{
    id: string
    token: string
  }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const ActivatePage = async ({ params }: ActivatePageProps) => {
  const { id, token } = await params
  const activationUrl =
    id && token ? `${baseUrl}/account/activate/${id}/${token}` : ''

  return <ActivateForm activationUrl={activationUrl} />
}

export default ActivatePage
