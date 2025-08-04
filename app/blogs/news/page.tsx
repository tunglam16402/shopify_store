import { BlogList } from '@/components/blogs'
import CategoryMenu from '@/components/menu/CategoryMenu'
import getAllAriclesQuery from '@/graphql/get-all-article-query'
import getBlogsQuery from '@/graphql/get-all-blog-query'
import { shopifyFetch } from '@/lib/shopify'
import { GetAllArticlesQuery, GetBlogsQuery } from '@/types/shopify/graphql'

const Blogs = async () => {
  const data = await shopifyFetch<GetAllArticlesQuery>({
    query: getAllAriclesQuery,
  })

  const blogs = (data.articles.nodes ?? []).map((article) => ({
    id: article.id,
    title: article.title,
    handle: article.handle,
    excerpt: article.excerpt ?? '',
    publishedAt: article.publishedAt,
    imageUrl: article.image?.url,
    author: article.author?.name ?? 'Unknown',
    blogCategory: article.blog?.handle ?? 'uncategorized',
  }))

  const blogData = await shopifyFetch<GetBlogsQuery>({
    query: getBlogsQuery,
  })
  const category =
    blogData?.blogs?.nodes.map((blog) => ({
      handle: blog.handle,
      title: blog.title,
    })) || []

  return (
    <div>
      <aside>
        <CategoryMenu categoryItems={category} />
      </aside>
      <section>
        <BlogList blogs={blogs} />
      </section>
    </div>
  )
}

export default Blogs
