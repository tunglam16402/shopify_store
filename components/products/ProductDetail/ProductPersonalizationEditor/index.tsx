'use client'

import { useState } from 'react'

import { IcoDown, Logo } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import { ProductDetailProps } from '..'
import AddToCart from '../../AddToCart'
import { PersonalizationConfig } from '../type'
import { FONT_FAMILY_MAP, FONT_SIZE_MAP_DESKTOP, FONT_SIZE_MAP_MOBILE } from '../productDetail.contfig'

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
  const { textBlock } = personalization
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [values, setValues] = useState<Record<string, string>>(() =>
    textBlock.lines.reduce(
      (acc, line) => {
        acc[line.id] = ''
        return acc
      },
      {} as Record<string, string>
    )
  )

  const [font, setFont] = useState(textBlock.font)
  const [fontSize, setFontSize] = useState<'S' | 'M' | 'L'>(textBlock.fontSize)
  const [color, setColor] = useState(textBlock.color)
  const [fontWeight, setFontWeight] = useState(textBlock.fontWeight)

  const [posX, setPosX] = useState<number | null>(null)
  const [posY, setPosY] = useState<number | null>(null)

  const safeArea = textBlock.safeArea

  const minX = safeArea?.insetX ?? 0
  const maxX = 1 - (safeArea?.insetX ?? 0)

  const minY = safeArea?.insetY ?? 0
  const maxY = 1 - (safeArea?.insetY ?? 0)

  const rawX = posX ?? textBlock.position.x
  const rawY = posY ?? textBlock.position.y

  const x = clamp(rawX, minX, maxX)
  const y = clamp(rawY, minY, maxY)

  const updateLineValue = (
    lineId: string,
    value: string,
    maxLength: number
  ) => {
    setValues((prev) => ({
      ...prev,
      [lineId]: value.slice(0, maxLength),
    }))
  }

  const fontSizeMap = isMobile ? FONT_SIZE_MAP_MOBILE : FONT_SIZE_MAP_DESKTOP
  const totalPrice = Number((product.variant.basePrice + 20).toFixed(2))

  return (
    <div className="layout-width mb-32! md:mb-24!">
      {/* header */}
      <div className=" fixed top-0 left-0 w-full h-14 border-b flex items-center">
        <Button
          className="px-4 md:px-8 text-base uppercase ml-4"
          onClick={onClose}
          variant={'default'}
        >
          <IcoDown className="rotate-90 size-6" />
          <div>Exit</div>
        </Button>

        <Link
          href="/"
          className="absolute md:left-1/2 left-3/4 -translate-x-1/2"
        >
          <Logo className="size-40" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mt-20">
        <div className="space-y-6 w-full">
          <div>
            <p className="text-sm ">
              COLOR:
              <span className="font-medium capitalize ml-2">{color}</span>
            </p>
            <div className="flex gap-2 mt-2">
              {personalization.options?.colors?.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-7 w-7 border bg-${c} ${
                    color === c ? 'ring-1 ring-black' : ''
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {textBlock.lines.map((line) => (
            <div key={line.id} className="flex items-center">
              <label className="block text-sm uppercase">{line.label}:</label>
              <input
                type="text"
                value={values[line.id]}
                placeholder="Your text here"
                onChange={(e) =>
                  updateLineValue(line.id, e.target.value, line.maxLength)
                }
                className="border px-2 py-1 text-sm mx-2 w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                {values[line.id].length}/{line.maxLength}
              </p>
            </div>
          ))}

          <div className="flex items-center gap-10">
            <div className="uppercase text-sm">Position: </div>
            <label className="flex items-center gap-2 text-sm">
              X
              <input
                type="number"
                step={personalization.options?.positionX?.step ?? 0.01}
                min={personalization.options?.positionX?.min ?? 0}
                max={personalization.options?.positionX?.max ?? 1}
                value={posX ?? textBlock.position.x}
                onChange={(e) => setPosX(+e.target.value)}
                className="w-20 border px-2 py-1"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              Y
              <input
                type="number"
                step={personalization.options?.positionY?.step ?? 0.01}
                min={personalization.options?.positionY?.min ?? 0}
                max={personalization.options?.positionY?.max ?? 1}
                value={posY ?? textBlock.position.y}
                onChange={(e) => setPosY(+e.target.value)}
                className="w-20 border px-2 py-1"
              />
            </label>
          </div>

          {/* FONT */}
          <div className="flex items-center gap-2">
            <div className="text-sm uppercase">Fonts: </div>
            <div className="flex gap-2">
              {personalization.options?.fonts?.map((f) => (
                <button
                  key={f}
                  onClick={() => setFont(f)}
                  className={`border px-3 py-1 text-sm capitalize ${
                    font === f ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm uppercase">Font size: </div>
            <div className="flex gap-2">
              {personalization.options?.fontSizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`border px-3 py-1 text-sm ${
                    fontSize === size ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm uppercase">Font Weight: </div>
            <div className="flex gap-2">
              {personalization.options?.fontWeights?.map((w) => (
                <button
                  key={w}
                  onClick={() => setFontWeight(w)}
                  className={`border px-3 py-1 text-sm capitalize ${
                    fontWeight === w ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="peer w-4 h-4 accent-primary cursor-pointer"
            />
            <span
              className="
                text-gray-600
                peer-checked:font-semibold
                peer-checked:text-gray-900
                transition
              "
            >
              I understand that personalized products are non-refundable after
              buy.
            </span>
          </label>

          <div className="bg-gray-100 p-6 rounded-md">
            <h5 className="text-3xl">Your order</h5>
            <div className="mt-4 pb-4 border-b border-gray-300">
              <div className="flex justify-between">
                <div className="font-medium">
                  Personalization of {product.title}
                </div>
                <div>
                  {product.variant?.currency} {product.variant?.basePrice}
                </div>
              </div>
              <div className="flex justify-between font-light ">
                <div>Personalization:</div>
                <div>{product.variant?.currency} 20</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mt-4">
                <div className="font-semibold uppercase">Total</div>
                <div>
                  {product.variant?.currency} {totalPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="relative">
          <div className="relative md:w-[732px] md:h-[732px] w-full h-full aspect-square">
            <Image
              src={product.images[product.images.length - 1]}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(min-width:769px) 45vw, 100vw"
            />
          </div>
          <span className="text-sm mt-2">
            Note that your personalized piece is made by hand, which means small
            variations in alignment or spacing may appear.
          </span>

          <div className="absolute inset-0 pointer-events-none">
            <div
              style={{
                position: 'absolute',
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                color,
                fontFamily: FONT_FAMILY_MAP[font],
                fontWeight,
              }}
            >
              {textBlock.lines.map((line) => (
                <div
                  key={line.id}
                  style={{
                    fontSize: `${fontSizeMap[fontSize]}px`,
                    whiteSpace: 'pre',
                  }}
                >
                  {values[line.id] || 'Your text here'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="
        fixed bottom-0 left-0 right-0 z-20 flex flex-col md:flex-row items-center md:justify-between gap-2 p-4 md:px-8
        bg-white border-t"
      >
        <div className="font-semibold text-base md:text-lg">
          Personalization of {product.title} | Personalized
        </div>
        <div className="w-full md:w-fit">
          <AddToCart
            variantId={product.variant?.id || ''}
            className="w-full md:w-fit md:px-24 md:text-lg bg-primary hover:bg-white! text-white hover:text-black!"
            showPrice={true}
            product={product}
            price={totalPrice}
          />
        </div>
      </div>
    </div>
  )
}
