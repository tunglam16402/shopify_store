import { BlogList } from '@/components/blogs'
import CategoryMenu from '@/components/menu/CategoryMenu'
import {
  getAllArticles,
  getBlogCategories,
} from '@/shopify/operations/get-articles'

const Blogs = async () => {
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

export default Blogs
