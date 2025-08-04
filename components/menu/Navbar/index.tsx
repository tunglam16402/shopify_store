import Link from 'next/link'

type Props = {
  menuItems: { title: string; url: string }[]
}

const Navbar = ({ menuItems }: Props) => {
  return (
    <nav className="hidden md:flex gap-10 uppercase">
      {menuItems.map((menu, key) => (
        <Link key={key} href={menu.url} className="hover:opacity-70">
          {menu.title}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
