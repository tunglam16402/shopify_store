'use client'

import { IcoFacebook, IcoInstagram, IcoTiktok } from '@/components/icons'
import { FooterDocumentData, Simplify } from '@/prismicio-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FooterLinkGroup from './FooterLinkGroup'
import { paymentMethodsMock } from '@/config/payment.config'

interface IFooter {
  data: Simplify<FooterDocumentData>
}

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
    <footer id="footer" className="bg-primary mt-16 md:mt-20 py-10 md:py-12">
      <div className="layout-width text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-20">
          {/* newsletter */}
          <div className="md:col-span-5">
            <div>
              <h3 className="text-lg font-semibold uppercase md:text-2xl">
                {newsletterData?.title}
              </h3>
              <p className="mt-2 text-sm md:text-base">
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
                  className="h-5 flex-1 border-none pl-2.5 text-base text-black outline-none"
                  placeholder="Email Address"
                  required
                />
                <button
                  disabled={status === 'loading'}
                  className="border-primary bg-accent hover:text-primary rounded-md border px-8 py-2 text-sm font-bold text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 md:cursor-pointer md:py-2.5"
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
              <p className="mt-10 font-semibold uppercase md:mt-5">Follow us</p>
              <div className="mt-3 flex items-center gap-6 md:mt-5 md:gap-11">
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

          <div className="mt-10 grid flex-1 grid-cols-1 md:col-span-7 md:mt-0 md:grid-cols-3 md:gap-12">
            <FooterLinkGroup title="Inspiration" links={data.inspiration} />
            <FooterLinkGroup title="Policies" links={data.policies} />
            <FooterLinkGroup title="Customer Care" links={data.customer_care} />
          </div>
        </div>

        <div className="mx-auto mt-4 h-[100px] w-full max-w-[500px] md:mt-12">
          <Link href="/" className="block h-full">
            <div className="relative h-full w-full">
              <Image
                alt="Logo"
                src="/LogoWhite.webp"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80vw, 60vw"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="mt-4 px-5 md:px-0">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethodsMock.map((method) => (
              <div key={method.id} className="h-4 w-9 md:h-[22px] md:w-12">
                {method.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-1 text-[10px] md:flex-row md:justify-between md:text-sm">
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
