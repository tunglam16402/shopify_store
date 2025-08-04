import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export type BlogCardProps = {
  blog: {
    id: string
    title: string
    handle: string
    excerpt: string
    publishedAt: string
    imageUrl?: string
    author: string
    blogCategory?: string
  }
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <article className="rounded-2xl overflow-hidden bg-white mt-2 p-4 flex flex-col h-full">
      <div className="relative">
        {blog.imageUrl && (
          <Link href={`/blogs/news/${blog.handle}`}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </Link>
        )}
      </div>
      <div>{blog.publishedAt}</div>

      <h2 className="title-heading mt-5">
        <Link
          href={`/blogs/news/${blog.handle}`}
          className="hover:text-gray-600 transition-colors duration-300"
        >
          {blog.title}
        </Link>
      </h2>

      <p className="my-3 side-text">{blog.excerpt}</p>

      <div className="mt-auto pt-4 border-t border-gray-300 flex items-center justify-between">
        <div className="flex gap-4">{blog.author}</div>
        <Link
          href={`/blogs/news/${blog.handle}`}
          className="bg-black text-white px-4 py-2 flex items-center justify-center gap-2 rounded-lg"
        >
          Read more <FaArrowRight />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
