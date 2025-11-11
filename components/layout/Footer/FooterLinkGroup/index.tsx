'use client'

import Dropdown from '@/components/ui/Dropdown'
import { KeyTextField } from '@prismicio/client'

interface IFooterLinkGroup {
  title: string
  links: { title: KeyTextField; pathname: KeyTextField }[]
}

const FooterLinkGroup: React.FC<IFooterLinkGroup> = ({ title, links }) => {
  if (!links?.length) return null

  return (
    <div className="text-white space-y-4">
      <Dropdown
        title={title}
        links={links.map((item) => ({
          title: item.title || '',
          pathname: item.pathname || '',
        }))}
        className="md:hidden"
        titleClassName="uppercase"
      />

      <div className="hidden md:block">
        <div className="">
          <p className="font-semibold uppercase">{title}</p>
        </div>
        <ul className="pt-5 space-y-3">
          {links.map((item, index) => (
            <li key={index}>
              <a
                href={item.pathname || ''}
                className="text-sm hover:text-[#e3c16f] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FooterLinkGroup
