import { BlogList } from '@/components/blogs'
import CategoryMenu from '@/components/menu/CategoryMenu'
import {
  getAllArticles,
  getBlogCategories,
} from '@/shopify/api/operations/get-articles'
import { cacheLife } from 'next/cache'

const BlogsLoader = async () => {
  'use cache'
  cacheLife('days')

  const blogs = await getAllArticles()
  const category = await getBlogCategories()

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

const Blogs = async () => {
  return (
      <BlogsLoader />
  )
}

export default Blogs
