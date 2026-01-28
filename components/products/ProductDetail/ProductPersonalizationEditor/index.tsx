'use client'

import { usePersonalization } from '@/lib/hooks/usePersonalization'
import { ProductDetailProps } from '..'
import { PersonalizationConfig } from '../type'
import PersonalizationFooter from './PersonalizationFooter'
import PersonalizationHeader from './PersonalizationHeader'
import PersonalizationOptions from './PersonalizationOptions'
import PersonalizationOrder from './PersonalizationOrder'
import { PersonalizationPreview } from './PersonalizationPreview'

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

  const totalPrice = Number(
    (product.variant.basePrice + PersonalizationPrice).toFixed(2)
  )

  return (
    <div className="layout-width mb-40! md:mb-24!">
      <PersonalizationHeader onClose={onClose} />

      <div className="flex gap-8 flex-col md:flex-row md:gap-28 mt-20">
        <div className="flex flex-col md:w-[45%]">
          <PersonalizationOptions
            personalization={personalization}
            {...state}
          />

          <label className="items-center gap-2 text-sm cursor-pointer mt-8 hidden md:flex">
            <input
              type="checkbox"
              className="peer w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-gray-500 peer-checked:text-black transition">
              I understand that personalized products are non-refundable.
            </span>
          </label>

          <div className="mt-2 hidden md:block">
            <PersonalizationOrder product={product} totalPrice={totalPrice} />
          </div>
        </div>

        <div className="md:w-[55%] ">
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

      <PersonalizationFooter product={product} totalPrice={totalPrice} />
    </div>
  )
}
