'use client'

import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'

export function PreviewBanner() {
  return (
    <PrismicPreview repositoryName={repositoryName}>
      <div className="fixed bottom-4 right-4 z-50 rounded bg-black px-4 py-2 text-sm text-white">
        Preview mode
        <a href="/api/prismicio/exit-preview" className="ml-3 underline">
          Exit
        </a>
      </div>
    </PrismicPreview>
  )
}
