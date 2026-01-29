import { CartLinePersonalizationPayload } from '@/shopify/cart/use-cart'

interface IPersonalizeInfo {
  personalization: CartLinePersonalizationPayload
}

const PersonalizeInfo = ({ personalization }: IPersonalizeInfo) => {
  return (
    <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
      {Object.entries(personalization.values ?? {}).map(([key, value]) => (
        <span key={key} className="whitespace-nowrap">
          <span className="capitalize">{key}</span>:
          <span className="font-medium text-gray-800">{value}</span>
        </span>
      ))}

      <span className="whitespace-nowrap">
        Color:
        <span className="font-medium text-gray-800">
          {personalization.color}
        </span>
      </span>

      <span className="whitespace-nowrap">
        Font:
        <span className="font-medium text-gray-800">
          {personalization.font}
        </span>
      </span>

      <span className="whitespace-nowrap">
        Size:
        <span className="font-medium text-gray-800">
          {personalization.fontSize}
        </span>
      </span>

      <span className="whitespace-nowrap">
        Style:
        <span className="font-medium text-gray-800">
          {personalization.fontWeight}
        </span>
      </span>
    </div>
  )
}

export default PersonalizeInfo
