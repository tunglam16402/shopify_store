// app/pages/[slug]/page.tsx
import PolicyDetail from '@/components/policies/PolicyDetail'
import { getShopPolicies } from '@/shopify/api/operations/get-policies'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const POLICY_MAP = {
  'privacy-policy': 'privacyPolicy',
  'refund-policy': 'refundPolicy',
  'shipping-policy': 'shippingPolicy',
  'terms-and-conditions': 'termsOfService',
} as const

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!(slug in POLICY_MAP)) notFound()

  const policies = await getShopPolicies()
  const policyKey = POLICY_MAP[slug as keyof typeof POLICY_MAP]
  const policy = policies?.shop?.[policyKey]

  if (!policy) notFound()

  return (
    <main className="layout-width mobile-mt">
      <PolicyDetail policy={policy} />
    </main>
  )
}
