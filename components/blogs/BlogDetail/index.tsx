import { formatDate } from '@/lib/helper'
import { GetDetailArticleQuery } from '@/shopify/types/graphql'
import Image from 'next/image'
import { SimpleZigzagContent } from '../helper'

type BlogDetailProps = {
  blog: NonNullable<GetDetailArticleQuery['blog']>['articleByHandle']
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  const titleImage =
    blog?.titleImage?.reference?.__typename === 'MediaImage'
      ? blog.titleImage.reference.image
      : null

  console.log('blog :>> ', blog)

  return (
    <section>
      {blog?.image && (
        <div className="w-full">
          <Image
            src={blog.image.url}
            alt={blog.title}
            width={1920}
            height={718}
            className="h-auto w-full object-contain"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      )}

      <div className="mt-4 md:mt-6">
        <div className="page-width flex flex-col items-center justify-between gap-2 text-sm md:flex-row md:text-xl">
          <h1 className="uppercase">{blog?.title}</h1>
          <div className="side-text flex flex-wrap items-center gap-2 md:gap-4">
            <span>{blog?.author.name}</span>
            <span>|</span>
            <time>{formatDate(blog?.publishedAt)}</time>
          </div>
        </div>

        {titleImage && (
          <div className="w-full">
            <Image
              src={titleImage.url}
              alt={titleImage.altText || blog?.title}
              width={titleImage.width || 2600}
              height={titleImage.height || 349}
              className="h-auto w-full object-contain"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        )}

        {blog?.excerpt && (
          <h2 className="mx-6 mt-6 text-center text-lg leading-tight md:mx-40 md:text-2xl">
            {blog?.excerpt}
          </h2>
        )}

        {blog?.contentHtml && (
          <SimpleZigzagContent contentHtml={blog.contentHtml} />
        )}
      </div>
    </section>
  )
}

export default BlogDetail
