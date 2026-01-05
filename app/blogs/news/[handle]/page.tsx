import { BlogDetail } from '@/components/blogs'
import { getArticleByHandle } from '@/shopify/api/operations/get-articles'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  params: Promise<{ handle: string }>
}

const BlogDetailLoader = async ({ handle }: { handle: string }) => {
  'use cache'
  cacheLife('days')

  const detailBlog = await getArticleByHandle('news', handle)

  if (!detailBlog) return notFound()

  return <BlogDetail blog={detailBlog} />
}

const BlogDetailPage = async ({ params }: Props) => {
  const { handle } = await params

  return (
    <Suspense fallback={null}>
      <BlogDetailLoader handle={handle} />
    </Suspense>
  )
}

export default BlogDetailPage
