import { formatDate } from '@/lib/helper'
import { GetDetailArticleQuery } from '@/shopify/types/graphql'
import Image from 'next/image'
import { SimpleZigzagContent } from '../helper'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { AnimatedGroup } from '@/components/common/AnimatedGroup'

type BlogDetailProps = {
  blog: NonNullable<GetDetailArticleQuery['blog']>['articleByHandle']
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  const titleImage =
    blog?.titleImage?.reference?.__typename === 'MediaImage'
      ? blog.titleImage.reference.image
      : null

  const tileBanner =
    blog?.tileBanner?.reference?.__typename === 'MediaImage'
      ? blog.tileBanner.reference.image
      : null

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
        <AnimatedGroup>
          <div className="page-width flex flex-col items-center justify-between gap-2 text-sm md:flex-row md:text-xl">
            <h1 className="uppercase">{blog?.title}</h1>
            <div className="side-text flex flex-wrap items-center gap-2 md:gap-4">
              <span>{blog?.author.name}</span>
              <span>|</span>
              <time>{formatDate(blog?.publishedAt)}</time>
            </div>
          </div>
        </AnimatedGroup>

        <AnimatedGroup>
          {titleImage && (
            <div className="w-full">
              <Image
                src={titleImage.url}
                alt={titleImage.altText || ''}
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
            <h2 className="mx-6 mt-4 text-center text-lg leading-tight md:mx-40 md:mt-6 md:text-2xl">
              {blog?.excerpt}
            </h2>
          )}

          <div className="mt-10 flex justify-center md:mt-12">
            {blog?.handle && (
              <Link href={`/products/${blog.handle}`}>
                <Button
                  variant="primary"
                  className="px-16 text-base uppercase md:px-24 md:py-5 md:text-lg"
                >
                  Shop now
                </Button>
              </Link>
            )}
          </div>
        </AnimatedGroup>

        <AnimatedGroup>
          {blog?.contentHtml && (
            <SimpleZigzagContent
              contentHtml={blog.contentHtml}
              handle={blog.handle}
            />
          )}
        </AnimatedGroup>

        {tileBanner && (
          <div className="w-full">
            <Image
              src={tileBanner.url}
              alt={tileBanner.altText || ''}
              width={tileBanner.width || 2600}
              height={tileBanner.height || 549}
              className="h-auto w-full object-contain"
              sizes="100vw"
              loading="lazy"
              unoptimized
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogDetail
