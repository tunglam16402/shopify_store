import { formatDate } from '@/lib/helper'
import { GetDetailArticleQuery } from '@/shopify/types/graphql'
import Image from 'next/image'
import React from 'react'

type BlogDetailProps = {
  blog: NonNullable<GetDetailArticleQuery['blog']>['articleByHandle']
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <section>
      {blog?.image && (
        <div className="relative w-full h-[500px] md:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 z-10" />
          <Image
            src={blog.image.url}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-7xl wrapper mx-auto">
        <div className="text-lg side-text mt-6 flex items-center gap-2 md:text-2xl md:gap-4 flex-wrap">
          <span>{blog?.author.name}</span>
          <span>|</span>
          <time>{formatDate(blog?.publishedAt)}</time>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold mt-4">{blog?.title}</h1>

        {blog?.excerpt && (
          <p className="text-3xl md:text-5xl mt-6 text-primary font-semibold">
            {blog?.excerpt}
          </p>
        )}

        {blog?.contentHtml && (
          <div
            className="prose prose-lg max-w-none mt-10"
            dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
          />
        )}
      </div>
    </section>
  )
}

export default BlogDetail
