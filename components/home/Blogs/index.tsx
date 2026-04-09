'use client'

import { Button } from '@/components/ui/Button'
import PWSwiper from '@/components/ui/Swiper'
import { HomepageDocumentDataBlogItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import Link from 'next/link'
import React from 'react'
import BlogItem from './BlogItem'

const BLOG_HOME_BREAKPOINT = {
  0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 2 },
  640: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 2 },
  1024: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 2 },
}

interface IBlogs {
  blogs: GroupField<Simplify<HomepageDocumentDataBlogItem>>
}

const Blogs: React.FC<IBlogs> = ({ blogs }) => {
  return (
    <section className="page-width">
      <h2 className="mt-12 text-center text-3xl md:mt-16 md:text-[54px]">
        <span className="font-sub-heading px-2 text-4xl font-bold md:text-[54px]">
          the
        </span>
        <span className="uppercase">journal</span>
      </h2>
      <div className="mt-4 md:mt-8">
        <PWSwiper
          breakpoints={BLOG_HOME_BREAKPOINT}
          pagination={false}
          className="pw_swiper"
        >
          {blogs.map((blog) => (
            <BlogItem key={blog.pathname} blog={blog} />
          ))}
        </PWSwiper>
      </div>
      <div className="text-center">
        <Link href="/blogs/news">
          <Button
            className="mt-8 px-8 text-lg uppercase md:mt-12 md:px-12"
            variant={'outline'}
          >
            View more
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Blogs
