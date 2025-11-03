'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IcoClose } from '@/components/icons'

export type ViewedProduct = {
  id: string
  title: string
  handle: string
  imageUrl?: string
}

type Props = {
  product: ViewedProduct
  isRemovable: boolean
  onRemove?: (handle: string) => void
  onSelect: (term: string) => void
}

const SuggestionItem = ({ product, isRemovable, onRemove, onSelect }: Props) => {
  return (
    <div className="relative group">
      <Link
        href={`/products/${product.handle}`}
        onClick={() => onSelect(product.title)}
        className="flex flex-col items-center text-center hover:opacity-80 transition"
      >
        <Image
          src={product.imageUrl || '/placeholder.jpg'}
          alt={product.title}
          width={100}
          height={100}
          className="rounded object-cover"
        />
        <span className="text-sm mt-1">{product.title}</span>
      </Link>

      {isRemovable && (
        <button
          type="button"
          onClick={() => onRemove?.(product.handle)}
          className="absolute top-1 right-1 p-1 cursor-pointer"
          title="Remove"
        >
          <IcoClose className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>
      )}
    </div>
  )
}

export default SuggestionItem
