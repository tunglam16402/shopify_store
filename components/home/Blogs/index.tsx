'use client'

import { Carousel } from '@/components/common/Carousel'
import { HomepageDocumentDataBlogItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import React from 'react'
import BlogItem from './BlogItem'

interface IBlogs {
  blogs: GroupField<Simplify<HomepageDocumentDataBlogItem>>
}

const Blogs: React.FC<IBlogs> = ({ blogs }) => {
  return (
    <div>
      <div className="mt-5 md:mx-5">
        <h2 className="text-3xl md:text-5xl text-center mt-12">
          <span className="font-[tangerine] font-bold text-5xl px-2">the</span>
          <span className="uppercase">journal</span>
        </h2>
        <Carousel
          items={blogs}
          renderItem={(blog) => <BlogItem key={blog.pathname} blog={blog} />}
          slidesToShow={1}
          itemsToScroll={1}
          loop={true}
          autoPlay={false}
          showDots={false}
          responsiveConfig={[
            { breakpoint: 768, slidesToShow: 2 },
            { breakpoint: 1024, slidesToShow: 3, showArrows: true },
            {
              breakpoint: 1280,
              slidesToShow: 3,
              itemsToScroll: 1,
              showArrows: true,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Blogs
