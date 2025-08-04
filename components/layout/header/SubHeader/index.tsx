import Link from 'next/link'

type Props = {
  collections: { handle: string; title: string }[]
}

const SubHeader = async ({ collections }: Props) => {
  return (
    <nav>
      <ul className="hidden md:flex gap-4 mt-20">
        {collections.map((col) => (
          <li key={col.handle}>
            <Link
              href={`/collections/${col.handle}`}
              className="hover:underline"
            >
              {col.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SubHeader
