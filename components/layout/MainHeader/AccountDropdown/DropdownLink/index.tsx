import Link from 'next/link'

const DropdownLink = ({
  href,
  children,
  icon,
  onClick,
}: {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
      >
        {icon && <span className="text-gray-500">{icon}</span>}
        {children} 
      </Link>
    </li>
  )
}

export default DropdownLink
