import { CartLinePersonalizationPayload } from '@/shopify/cart/use-cart'

interface IPersonalizeInfo {
  personalization: CartLinePersonalizationPayload
}
const PersonalizeInfo = ({ personalization }: IPersonalizeInfo) => {
  const items = [
    ...Object.entries(personalization.values ?? {}).map(([label, value]) => ({
      label,
      value,
    })),

    { label: 'color', value: personalization.color },
    { label: 'font', value: personalization.font },
    { label: 'size', value: personalization.fontSize },
    { label: 'style', value: personalization.fontWeight },
  ]

  return (
    <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px] md:text-xs text-gray-600">
      {items.map(
        ({ label, value }) =>
          value && (
            <span key={label} className="whitespace-nowrap capitalize">
              {label}:{' '}
              <span className="font-medium text-gray-800">{value}</span>
            </span>
          )
      )}
    </div>
  )
}

export default PersonalizeInfo
