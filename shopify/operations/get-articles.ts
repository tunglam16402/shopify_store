import { shopifyFetch } from '../fetcher'
import {
  GetAllArticlesQuery,
  GetArticleListQuery,
  GetBlogsQuery,
  GetDetailArticleQuery,
} from '../types/graphql'
import getAllAriclesQuery from '../utils/query/get-all-article-query'
import getBlogsQuery from '../utils/query/get-all-blog-query'
import getArticleByBlogQuery from '../utils/query/get-article-by-blog-query'
import getDetailArticleQuery from '../utils/query/get-article-by-handle-query'

export async function getAllArticles() {
  const data = await shopifyFetch<GetAllArticlesQuery>({
    query: getAllAriclesQuery,
  })

  return (data.articles.nodes ?? []).map((article) => ({
    id: article.id,
    title: article.title,
    handle: article.handle,
    excerpt: article.excerpt ?? '',
    publishedAt: article.publishedAt,
    imageUrl: article.image?.url,
    author: article.author?.name ?? 'Unknown',
    blogCategory: article.blog?.handle ?? 'uncategorized',
  }))
}

export async function getArticleByHandle(
  blogHandle: string,
  articleHandle: string
) {
  const data = await shopifyFetch<GetDetailArticleQuery>({
    query: getDetailArticleQuery,
    variables: {
      blogHandle,
      articleHandle,
    },
  })

  return data.blog?.articleByHandle || null
}

export async function getBlogCategories() {
  const data = await shopifyFetch<GetBlogsQuery>({
    query: getBlogsQuery,
  })

  return (
    data?.blogs?.nodes.map((blog) => ({
      handle: blog.handle,
      title: blog.title,
    })) || []
  )
}

export async function getArticlesByCategory(handle: string) {
  const data = await shopifyFetch<GetArticleListQuery>({
    query: getArticleByBlogQuery,
    variables: { handle },
  })

  return (data?.blog?.articles.nodes || []).map((article) => ({
    id: article.id,
    title: article.title,
    handle: article.handle,
    excerpt: article.excerpt ?? '',
    publishedAt: article.publishedAt,
    imageUrl: article.image?.url,
    author: article.author?.name ?? 'Unknown',
  }))
}
