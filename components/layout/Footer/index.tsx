'use client'

import {
  IcoApplePay,
  IcoFacebook,
  IcoGooglePay,
  IcoInstagram,
  IcoKlarna,
  IcoMaestro,
  IcoMasterCard,
  IcoPaypal,
  IcoShopifyPay,
  IcoTiktok,
  IcoVisa,
} from '@/components/icons'
import { FooterDocumentData, Simplify } from '@/prismicio-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FooterLinkGroup from './FooterLinkGroup'

interface IFooter {
  data: Simplify<FooterDocumentData>
}

const paymentMethodsMock = [
  { id: 'paypal', icon: <IcoPaypal className="h-full w-full " /> },
  {
    id: 'mastercard',
    icon: <IcoMasterCard className="h-full w-full " />,
  },
  { id: 'visa', icon: <IcoVisa className="h-full w-full " /> },
  { id: 'applepay', icon: <IcoApplePay className="h-full w-full " /> },
  { id: 'googlepay', icon: <IcoGooglePay className="h-full w-full " /> },
  {
    id: 'klarna',
    icon: <IcoKlarna className="h-full w-full " />,
  },
  {
    id: 'maestro',
    icon: <IcoMaestro className="h-full w-full " />,
  },
  {
    id: 'shopifypay',
    icon: <IcoShopifyPay className="h-full w-full " />,
  },
]

const Footer: React.FC<IFooter> = ({ data }) => {
  const newsletterData = data.newsletter[0]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }
  return (
    <footer id="footer" className="bg-primary mt-10 py-10 md:py-12">
      <div className="layout-width text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-20">
          {/* newsletter */}
          <div className="md:col-span-5">
            <div>
              <h3 className="uppercase text-lg font-semibold md:text-2xl">
                {newsletterData?.title}
              </h3>
              <p className="text-sm mt-2 md:text-base">
                {newsletterData?.description}
              </p>
              <form
                className="mt-3 flex items-center justify-between gap-4 rounded-lg bg-white p-[5px]"
                onSubmit={handleEmailSubmit}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-5 flex-1 border-none pl-2.5 text-base outline-none text-black"
                  placeholder="Email Address"
                  required
                />
                <button
                  disabled={status === 'loading'}
                  className="rounded-md border border-primary md:cursor-pointer bg-accent px-8 py-2 text-sm font-bold text-black hover:bg-white hover:text-primary md:py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting...' : 'Sign up'}
                </button>
              </form>

              {status === 'success' && (
                <p className="mt-3 text-sm text-green-400">
                  ✅ Thank you! Please check your email to confirm your
                  subscription.
                </p>
              )}

              {status === 'error' && (
                <p className="mt-3 text-sm text-red-400">
                  ❌ Something went wrong. Please try again later.
                </p>
              )}
            </div>

            <div>
              <p className="uppercase mt-10 font-semibold md:mt-5">Follow us</p>
              <div className="flex items-center gap-6 md:gap-11 mt-3 md:mt-5">
                <Link href="https://www.facebook.com">
                  <IcoFacebook className="h-7 w-7 md:h-[33px] md:w-[33px]" />
                </Link>
                <Link href="https://www.instagram.com">
                  <IcoInstagram className="h-7 w-7 md:h-[33px] md:w-[33px]" />
                </Link>
                <Link href="https://www.tiktok.com">
                  <IcoTiktok className="h-7 w-7 md:h-[33px] md:w-[33px]" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 flex-1 md:gap-12 mt-10 md:col-span-7 md:mt-0">
            <FooterLinkGroup title="Inspiration" links={data.inspiration} />
            <FooterLinkGroup title="Policies" links={data.policies} />
            <FooterLinkGroup title="Customer Care" links={data.customer_care} />
          </div>
        </div>

        <div className="mx-auto mt-4 relative w-full h-[100px] max-w-[500px] md:mt-12">
          <Link href="/">
            <Image
              alt="Logo"
              src="/LogoWhite.webp"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        <div className="px-5 md:px-0 mt-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethodsMock.map((method) => (
              <div key={method.id} className="h-4 w-9 md:h-[22px] md:w-12">
                {method.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-[10px] gap-1 md:flex-row md:justify-between mt-10 md:text-sm">
          <div>
            <span>
              © {new Date().getFullYear()},<a href=""> Printwork. </a>
              All Rights Reserved
            </span>
          </div>
          <div>Website created by tunglam1604</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
