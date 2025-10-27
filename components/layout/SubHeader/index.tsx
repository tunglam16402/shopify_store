'use client'

import { useState } from 'react'
import Link from 'next/link'

type Props = {
  collections: {
    handle: string
    title: string
    description?: string
    image?: string
  }[]
}

const SubHeader = ({ collections }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <nav className="relative bg-gray-200 mt-15">
      <ul className="hidden md:flex items-center justify-center">
        {collections.map((col, index) => (
          <li
            key={col.handle}
            className="py-4 px-3 relative"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <Link
              href={`/collections/${col.handle}`}
              className="text-gray-800 hover:text-gray-900 font-medium transition-colors"
            >
              {col.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Full-width hover container */}
      <div
        className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-900 ease-out ${
          activeIndex !== null ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        onMouseEnter={() => activeIndex !== null && setActiveIndex(activeIndex)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <div className="container mx-auto px-4 py-8">
          {activeIndex !== null && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {collections[activeIndex].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {collections[activeIndex].description ||
                  `Khám phá bộ sưu tập ${collections[activeIndex].title} của chúng tôi`}
              </p>

              {/* Grid layout cho nội dung mở rộng */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    Sản phẩm nổi bật
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      <Link href="#" className="hover:text-gray-900">
                        Sản phẩm 1
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-gray-900">
                        Sản phẩm 2
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-gray-900">
                        Sản phẩm 3
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Danh mục con</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      <Link href="#" className="hover:text-gray-900">
                        Danh mục A
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-gray-900">
                        Danh mục B
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-gray-900">
                        Danh mục C
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Xem thêm</h4>
                  <Link
                    href={`/collections/${collections[activeIndex].handle}`}
                    className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-sm"
                  >
                    Xem toàn bộ bộ sưu tập →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.9s ease-out;
        }
      `}</style>
    </nav>
  )
}

export default SubHeader
