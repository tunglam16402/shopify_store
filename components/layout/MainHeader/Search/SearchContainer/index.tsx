'use client'

import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  input: string
  suggestions: NonNullable<
    GetPredictiveSearchQuery['predictiveSearch']
  >['products']
  onSelect: (term: string) => void
}

const SearchContainer = ({ input, suggestions, onSelect }: Props) => {
  return (
    <div className="absolute left-1/2 top-full z-20 mt-2 w-[900px] -translate-x-1/2 bg-white border shadow-md rounded p-3 max-h-80 overflow-y-auto">
      {suggestions.length > 0 ? (
        <ul className="divide-y">
          {suggestions.map((product) => (
            <li key={product.id} className="py-2">
              <Link
                href={`/products/${product.handle}`}
                onClick={() => onSelect(product.title)}
                className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
              >
                <Image
                  src={product.featuredImage?.url || ''}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
                <span className="text-sm">{product.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        // 👇 Hiển thị trạng thái mặc định khi vừa click vào
        <div className="text-sm text-gray-500 p-2">
          Start typing to search products...
        </div>
      )}
    </div>
  )
}

export default SearchContainer
