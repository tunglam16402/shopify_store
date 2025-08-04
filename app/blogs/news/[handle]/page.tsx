import { BlogDetail } from '@/components/blogs'
import getDetailArticleQuery from '@/graphql/get-article-by-handle-query'
import { shopifyFetch } from '@/lib/shopify'
import { GetDetailArticleQuery } from '@/types/shopify/graphql'
import React from 'react'

interface Props {
  params: Promise<{ handle: string }>
}

const BlogDetailPage = async ({ params }: Props) => {
  const { handle } = await params

  const data = await shopifyFetch<GetDetailArticleQuery>({
    query: getDetailArticleQuery,
    variables: {
      blogHandle: 'news',
      articleHandle: handle,
    },
  })

  const detailBlog = data.blog?.articleByHandle

  console.log('detailBlog :>> ', detailBlog)

  if (!detailBlog) {
    return <div>blog not found.</div>
  }

  return <BlogDetail blog={detailBlog} />
}

export default BlogDetailPage
