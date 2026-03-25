import Image from 'next/image'
import Link from 'next/link'

function extractTexts(contentHtml: string) {
  const matches = [...contentHtml.matchAll(/<(span|p)[^>]*>([\s\S]*?)<\/\1>/gi)]

  return matches
    .map((match) =>
      match[2]
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean)
}

function extractImages(contentHtml: string) {
  const imgMatches = [
    ...contentHtml.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi),
  ]

  return imgMatches.map((match) => match[1]).filter(Boolean)
}

export function SimpleZigzagContent({
  contentHtml,
  handle,
}: {
  contentHtml: string
  handle?: string
}) {
  const texts = extractTexts(contentHtml)
  const images = extractImages(contentHtml)
  const maxLen = Math.max(texts.length, images.length)

  return (
    <div className="mt-10 space-y-8 md:space-y-0">
      {Array.from({ length: maxLen }).map((_, index) => {
        const isReverse = index % 2 === 1

        const textBlock = (
          <div
            className={`flex items-center ${
              isReverse ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <p className="font-heading px-10 text-center text-lg leading-tight tracking-tight md:px-20 md:text-2xl">
              {texts[index] || ''}
            </p>
          </div>
        )

        const imageBlock = images[index] ? (
          <Link
            href={`/products/${handle}`}
            className={isReverse ? 'md:order-1' : 'md:order-2'}
          >
            <Image
              src={images[index]}
              alt={`Article image ${index + 1}`}
              width={1600}
              height={900}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
        ) : (
          <div className={isReverse ? 'md:order-1' : 'md:order-2'} />
        )

        return (
          <div
            key={index}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0"
          >
            {imageBlock}
            {textBlock}
          </div>
        )
      })}
    </div>
  )
}
