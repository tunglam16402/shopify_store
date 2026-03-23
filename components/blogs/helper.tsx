import Image from 'next/image'

function extractTexts(contentHtml: string) {
  const spanMatches = [
    ...contentHtml.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/gi),
  ]

  return spanMatches
    .map((match) =>
      match[1]
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

export function SimpleZigzagContent({ contentHtml }: { contentHtml: string }) {
  const texts = extractTexts(contentHtml)
  const images = extractImages(contentHtml)
  console.log('images :>> ', images)
  const maxLen = Math.max(texts.length, images.length)

  return (
    <div className="mt-10 space-y-8 md:space-y-12">
      {Array.from({ length: maxLen }).map((_, index) => {
        const isReverse = index % 2 === 1

        const textBlock = (
          <div className="flex items-center">
            <p className="text-base leading-8 md:text-lg md:leading-9">
              {texts[index] || ''}
            </p>
          </div>
        )

        const imageBlock = images[index] ? (
          <div className="relative min-h-[300px] w-full overflow-hidden rounded-3xl md:min-h-[500px]">
            <Image
              src={images[index]}
              alt={`Article image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div />
        )

        return (
          <div
            key={index}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10"
          >
            {isReverse ? (
              <>
                {imageBlock}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {imageBlock}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
