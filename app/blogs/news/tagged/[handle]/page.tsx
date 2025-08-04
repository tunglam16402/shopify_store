import { BlogList } from '@/components/blogs'
import getArticleByBlogQuery from '@/graphql/get-article-by-blog-query'
import { shopifyFetch } from '@/lib/shopify'
import { GetArticleListQuery } from '@/types/shopify/graphql'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ handle: string }>
}

const BlogCategoryPage = async ({ params }: Props) => {
  const { handle } = await params

  const data = await shopifyFetch<GetArticleListQuery>({
    query: getArticleByBlogQuery,
    variables: { handle },
  })

  const category = (data?.blog?.articles.nodes || []).map((article) => ({
    id: article.id,
    title: article.title,
    handle: article.handle,
    excerpt: article.excerpt ?? '',
    publishedAt: article.publishedAt,
    imageUrl: article.image?.url,
    author: article.author?.name ?? 'Unknown',
  }))

  if (!category) return notFound()

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <BlogList blogs={category} />
    </main>
  )
}

export default BlogCategoryPage
