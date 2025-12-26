import { BlogList } from '@/components/blogs'
import CategoryMenu from '@/components/menu/CategoryMenu'
import {
  getAllArticles,
  getBlogCategories,
} from '@/shopify/api/operations/get-articles'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

const Blogs = async () => {
  'use cache'
  cacheLife('days')

  const blogs = await getAllArticles()
  const category = await getBlogCategories()

  return (
    <div>
      <aside>
        <Suspense>
          <CategoryMenu categoryItems={category} />
        </Suspense>
      </aside>
      <section>
        <Suspense>
          <BlogList blogs={blogs} />
        </Suspense>
      </section>
    </div>
  )
}

export default Blogs
