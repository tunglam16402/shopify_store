import { BlogList } from '@/components/blogs'
import { getArticlesByCategory } from '@/shopify/operations/get-articles'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ handle: string }>
}

const BlogCategoryPage = async ({ params }: Props) => {
  const { handle } = await params

  const category = await getArticlesByCategory(handle)

  if (!category) return notFound()

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <BlogList blogs={category} />
    </main>
  )
}

export default BlogCategoryPage
