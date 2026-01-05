import { BlogList } from '@/components/blogs'
import { getArticlesByCategory } from '@/shopify/api/operations/get-articles'
import { notFound } from 'next/navigation'

const BlogCategoryPage = async ({
  params,
}: PageProps<'/blogs/news/tagged/[handle]'>) => {
  const { handle } = await params

  const category = await getArticlesByCategory(handle)

  if (!category) notFound()

  return (
    <main className="p-6 max-w-5xl mx-auto">
        <BlogList blogs={category} />
    </main>
  )
}

export default BlogCategoryPage
