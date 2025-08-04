import Link from 'next/link'
import React from 'react'

type Props = {
  categoryItems: { title: string; handle: string }[]
}

const CategoryMenu = ({ categoryItems }: Props) => {
  return (
    <nav className="hidden md:flex gap-10 uppercase">
      {categoryItems.map((menu, key) => (
        <Link
          key={key}
          href={`/blogs/news/tagged/${menu.handle}`}
          className="hover:opacity-70"
        >
          {menu.title}
        </Link>
      ))}
    </nav>
  )
}

export default CategoryMenu
