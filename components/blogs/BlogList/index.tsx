import React from 'react'
import BlogCard, { BlogCardProps } from '../BlogCard'

type BlogListProps = {
  blogs: BlogCardProps['blog'][]
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <section className="mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </section>
  )
}

export default BlogList
