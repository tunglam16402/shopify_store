'use client'

import { Carousel } from '@/components/common/Carousel'
import { HomepageDocumentDataBlogItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import React from 'react'
import BlogItem from './BlogItem'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import PWSwiper from '@/components/ui/Swiper'

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
      <h2 className="text-3xl md:text-[54px] text-center mt-12 md:mt-16">
        <span className="font-sub-heading font-bold text-4xl md:text-[54px] px-2">
          the
        </span>
        <span className="uppercase">journal</span>
      </h2>
      <div className="mt-4 md:mt-8">
        <PWSwiper breakpoints={BLOG_HOME_BREAKPOINT} pagination={false}>
          {blogs.map((blog) => (
            <BlogItem key={blog.pathname} blog={blog} />
          ))}
        </PWSwiper>
      </div>
      <div className="text-center">
        <Link href="/blogs/news">
          <Button
            className="uppercase mt-8 px-8 md:px-12 md:mt-12 text-lg"
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
