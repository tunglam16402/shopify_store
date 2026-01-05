import { BlogList } from '@/components/blogs'
import { getArticlesByCategory } from '@/shopify/api/operations/get-articles'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ handle: string }>
}

const BlogCategoryLoader = async ({ handle }: { handle: string }) => {
  'use cache'
  cacheLife('days')

  const category = await getArticlesByCategory(handle)

  if (!category) return notFound()

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <BlogList blogs={category} />
    </main>
  )
}

const BlogCategoryPage = async ({ params }: Props) => {
  const { handle } = await params

  return (
    <Suspense fallback={null}>
      <BlogCategoryLoader handle={handle} />
    </Suspense>
  )
}

export default BlogCategoryPage
