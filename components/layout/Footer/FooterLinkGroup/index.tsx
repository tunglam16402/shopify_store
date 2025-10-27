'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { KeyTextField } from '@prismicio/client'

interface IFooterLinkGroup {
  title: string
  links: { title: KeyTextField; pathname: KeyTextField }[]
}

const FooterLinkGroup: React.FC<IFooterLinkGroup> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false)
  if (!links?.length) return null

  return (
    <div className="text-white space-y-4">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="border-b border-[#e3c16f] pb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p className="font-semibold uppercase tracking-wide">
              {title}
            </p>
            <button className="text-white transition-transform duration-300">
              {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="pt-4 space-y-3">
              {links.map((item, index) => (
                <li key={index}>
                  <a href={item.pathname || ''} className="text-sm">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="">
          <p className="font-semibold uppercase">
            { title }
          </p>
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
