'use client'

import { useState } from 'react'

import Image from 'next/image'
import { IcoDown, Logo } from '@/components/icons'
import Link from 'next/link'
import ProductBottomInfo from '../ProductInformation/ProductBottomInfo'
import { ProductDetailProps } from '..'
import { PersonalizationConfig } from '../type'

interface Props {
  product: ProductDetailProps['product']
  personalization: PersonalizationConfig
}

const FONT_SIZE_MAP: Record<'S' | 'M' | 'L', number> = {
  S: 14,
  M: 16,
  L: 18,
}

const FONT_FAMILY_MAP: Record<string, string> = {
  classic: 'var(--font-geist-mono)',
  modern: 'var(--font-heading)',
}

export function ProductPersonalizationEditor({
  personalization,
  product,
}: Props) {
  // init values cho từng line
  const { textBlock } = personalization

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

  console.log('personalization :>> ', personalization)

  return (
    <div className="layout-width">
      {/* header */}
      <div className="absolute top-0 left-0 w-full h-14 border-b flex items-center">
        <div className="px-4 md:px-8 text-base md:text-lg cursor-pointer uppercase flex items-center">
          <IcoDown className="rotate-90 size-5 md:size-7 mr-2" />
          <div>Exit</div>
        </div>

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

          {/* FONT */}
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium uppercase">Fonts: </div>
            <div className="flex gap-2">
              {personalization.options?.fonts?.map((f) => (
                <button
                  key={f}
                  onClick={() => setFont(f)}
                  className={`border px-3 py-1 text-sm ${
                    font === f ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium uppercase">Font size: </div>
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
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="relative">
          <div className="relative md:w-[732px] md:h-[732px] w-full h-full aspect-square">
            <Image
              src={product.images[5]}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(min-width:769px) 50vw, 100vw"
            />
          </div>
          <span className="text-xs">
            Note that your personalized piece is made by hand, which means small
            variations in alignment or spacing may appear.
          </span>

          <div className="absolute inset-0 pointer-events-none">
            <div
              style={{
                position: 'absolute',
                left: `${textBlock.position.x * 100}%`,
                top: `${textBlock.position.y * 100}%`,
                transform: 'translate(-50%, -50%)',
                color,
                fontFamily: FONT_FAMILY_MAP[font],
              }}
            >
              {textBlock.lines.map((line, index) => (
                <div
                  key={line.id}
                  style={{
                    marginTop: index === 0 ? 0 : `${textBlock.lineGap * 100}%`,
                    fontSize: `${FONT_SIZE_MAP[fontSize]}px`,
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

      <ProductBottomInfo product={product} />
    </div>
  )
}
