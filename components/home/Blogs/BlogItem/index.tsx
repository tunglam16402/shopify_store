import { HomepageDocumentDataBlogItem } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import React from 'react'

interface IBlogItem {
  blog: HomepageDocumentDataBlogItem
}

const BlogItem: React.FC<IBlogItem> = ({ blog }) => {
  return (
    <Link
      href={blog.pathname ?? ''}
      className="flex h-full flex-col bg-white px-2"
    >
      <div className="relative w-full overflow-hidden">
        <PrismicNextImage
          field={blog.image}
          className="object-contain transition-all duration-800 hover:scale-120"
          sizes="(min-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col px-2">
        <h3 className="mt-2 text-4xl font-light uppercase">{blog.title}</h3>
        <p className="mt-3 line-clamp-4 text-xs md:text-sm">
          {blog.description}
        </p>
      </div>
    </Link>
  )
}

export default BlogItem
