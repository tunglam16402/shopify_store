import { HomepageDocumentDataBlogItem } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import React from 'react'

interface IBlogItem {
  blog: HomepageDocumentDataBlogItem
}

const BlogItem:React.FC<IBlogItem> = ({blog}) => {
  return (
    <div>
      <PrismicNextImage field={blog.image} alt=''/>
      <div>
        <span>{blog.title}</span>
        <p>{blog.description}</p>
      </div>

    </div>
  )
}

export default BlogItem
