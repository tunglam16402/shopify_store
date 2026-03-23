import { BlogDetail } from '@/components/blogs'
import { getArticleByHandle } from '@/shopify/api/operations/get-articles'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'

const BlogDetailPage = async ({
  params,
}: PageProps<'/blogs/news/[handle]'>) => {
  'use cache'
  cacheLife('days')

  const { handle } = await params
  const detailBlog = await getArticleByHandle('news', handle)

  if (!detailBlog) return notFound()

  return (
    <div className='mobile-mt'>
      <BlogDetail blog={detailBlog} />
    </div>
  )
}

export default BlogDetailPage
