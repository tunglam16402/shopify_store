'use client'

import { usePersonalization } from '@/lib/hooks/usePersonalization'
import { ProductDetailProps } from '..'
import { PersonalizationConfig } from '../type'
import PersonalizationFooter from './PersonalizationFooter'
import PersonalizationHeader from './PersonalizationHeader'
import PersonalizationOptions from './PersonalizationOptions'
import PersonalizationOrder from './PersonalizationOrder'
import { PersonalizationPreview } from './PersonalizationPreview'
import { CartLinePersonalizationPayload } from '@/shopify/cart/use-cart'

const PersonalizationPrice = 20

interface Props {
  product: ProductDetailProps['product']
  personalization: PersonalizationConfig
  onClose: () => void
}

export function ProductPersonalizationEditor({
  personalization,
  product,
  onClose,
}: Props) {
  const state = usePersonalization(personalization)

  const personalizationPayload: CartLinePersonalizationPayload = {
    productImage: product.images.at(-1)!,
    textBlock: {
      lines: personalization.textBlock.lines.map((l) => ({
        id: l.id,
        label: l.label,
      })),
    },
    values: state.values,
    position: state.position,
    font: state.font,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    color: state.color,
  }

  const totalPrice = Number(
    ((product?.variant?.basePrice ?? 0) + PersonalizationPrice).toFixed(2)
  )

  return (
    <div className="layout-width mb-40! md:mb-24!">
      <PersonalizationHeader onClose={onClose} />

      <div className="mt-20 flex flex-col gap-8 md:flex-row md:gap-28">
        <div className="flex flex-col md:w-[45%]">
          <PersonalizationOptions
            personalization={personalization}
            {...state}
          />
          <div className="mt-2 hidden md:block">
            <PersonalizationOrder product={product} totalPrice={totalPrice} />
          </div>
        </div>

        <div className="md:w-[55%]">
          <PersonalizationPreview
            productImage={product.images.at(-1)!}
            textBlock={personalization.textBlock}
            {...state}
          />
        </div>

        <div className="block md:hidden">
          <PersonalizationOrder product={product} totalPrice={totalPrice} />
        </div>
      </div>

      <PersonalizationFooter
        product={product}
        totalPrice={totalPrice}
        personalization={personalizationPayload}
        onClose={onClose}
      />
    </div>
  )
}
