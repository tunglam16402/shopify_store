import { HomepageDocumentDataBlogItem } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import React from 'react'

interface IBlogItem {
  blog: HomepageDocumentDataBlogItem
}

const BlogItem: React.FC<IBlogItem> = ({ blog }) => {
  return (
    <article className="flex flex-col h-full bg-white px-2">
      <div className="relative w-full ">
        <PrismicNextImage
          field={blog.image}
          className="object-contain"
          sizes="(min-width: 768px) 100vw, 25vw"
          alt=''
        />
      </div>

      <div className="flex flex-col flex-1 px-2">
        <h3 className="text-3xl font-light uppercase mt-2">
          {blog.title}
        </h3>
        <p className="text-xs md:text-base mt-3 line-clamp-4">
          {blog.description}
        </p>
      </div>
    </article>
  )
}

export default BlogItem
