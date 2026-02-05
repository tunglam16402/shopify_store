import Image from 'next/image'

import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import {
  FONT_FAMILY_MAP,
  FONT_SIZE_MAP_DESKTOP,
  FONT_SIZE_MAP_MOBILE,
} from '../../productDetail.contfig'
import { PersonalizationTextBlock } from '../../type'

interface Props {
  productImage: string
  textBlock: PersonalizationTextBlock
  values: Record<string, string>
  position: {
    x: number
    y: number
  }

  font: string
  fontSize: 'S' | 'M' | 'L'
  fontWeight: string
  color: string
}

export function PersonalizationPreview({
  productImage,
  textBlock,
  values,
  position: { x, y },
  font,
  fontSize,
  fontWeight,
  color,
}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const fontSizeMap = isMobile ? FONT_SIZE_MAP_MOBILE : FONT_SIZE_MAP_DESKTOP

  return (
    <div className="relative">
      <div className="relative aspect-square h-full w-full md:h-[732px] md:w-[732px]">
        <Image
          src={productImage}
          alt="Preview"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-2 text-center text-sm">
        Note that your personalized piece is made by hand, which means small
        variations in alignment or spacing may appear.
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div
          style={{
            position: 'absolute',
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            color,
            transform: 'translate(-50%, -50%)',
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
  )
}
