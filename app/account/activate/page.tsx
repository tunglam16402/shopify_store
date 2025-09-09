import ActivateForm from '@/components/auth/ActivateForm'

interface ActivatePageProps {
  params: {
    id: string
    token: string
  }
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function ActivatePage({ params }: ActivatePageProps) {
  const { id, token } = params
  const activationUrl =
    id && token ? `${baseUrl}/account/activate/${id}/${token}` : ''

  return <ActivateForm activationUrl={activationUrl} />
}
