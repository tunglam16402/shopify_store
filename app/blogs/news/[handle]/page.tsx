import { BlogDetail } from '@/components/blogs'
import { getArticleByHandle } from '@/shopify/operations/get-articles'

interface Props {
  params: Promise<{ handle: string }>
}

const BlogDetailPage = async ({ params }: Props) => {
  const { handle } = await params

  const detailBlog = await getArticleByHandle('news', handle)

  if (!detailBlog) {
    return <div>blog not found.</div>
  }

  return <BlogDetail blog={detailBlog} />
}

export default BlogDetailPage
