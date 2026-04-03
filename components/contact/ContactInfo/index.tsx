import { IcoFacebook, IcoInstagram, IcoTiktok } from '@/components/icons'
import StyledHeading from '@/components/ui/StyledHeading'
import Link from 'next/link'
import React, { FC } from 'react'

const contactInfo = [
  {
    title: 'ORDERS, SHIPPING & RETURNS',
    email: 'info@printworksmarket.com',
  },
  {
    title: 'OTHER CUSTOMER SERVICE',
    email: 'info@printworksmarket.com',
  },
  {
    title: 'WHOLESALE QUESTIONS',
    email: 'sales@printworksmarket.com',
  },
  {
    title: 'PRESS & COLLABS',
    email: 'press@printworksmarket.com',
  },
]

const ContactInfo: FC = () => {
  return (
    <div className="flex w-full flex-col gap-5 md:gap-8">
      {contactInfo.map((info, index) => (
        <div key={index} className="">
          <p className="text-lg font-semibold tracking-tighter md:text-xl">
            {info.title}
          </p>
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            {info.email}
          </p>
        </div>
      ))}
<div className="mt-6 md:mt-4">
  <StyledHeading
    text="connect with us"
    headingClass="text-3xl md:text-4xl uppercase tracking-tighter"
    subHeadingClass="text-4xl md:text-5xl font-sub-heading"
  />

  <div className="mt-5 flex items-center gap-8 md:mt-7 md:gap-10">
    {[
      { href: "https://www.facebook.com", Icon: IcoFacebook, label: "Facebook" },
      { href: "https://www.instagram.com", Icon: IcoInstagram, label: "Instagram" },
      { href: "https://www.tiktok.com", Icon: IcoTiktok, label: "TikTok" },
    ].map(({ href, Icon, label }) => (
      <Link
        key={label}
        href={href}
        aria-label={label}
        className="group relative flex flex-col items-center gap-1.5"
      >
        <Icon
          className="h-6 w-6 transition-all duration-500 ease-out group-hover:opacity-50 md:h-7 md:w-7"
          color="black"
        />
        <span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.2em] text-black/0 transition-all duration-500 group-hover:text-black/60"
        >
          {label}
        </span>
        <span
          className="mt-1 block h-px w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"
        />
      </Link>
    ))}
  </div>
</div>
    </div>
  )
}

export default ContactInfo
