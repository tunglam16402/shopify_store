'use client'

import { NewsletterDocumentData, Simplify } from '@/prismicio-types'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Modal from '../../common/Modal'
import { Button } from '../../ui/Button'

interface Props {
  data: Simplify<NewsletterDocumentData>
}

const NEWSLETTER_CLOSE_KEY = 'newsletter_popup_closed_until'
const NEWSLETTER_SUBMIT_KEY = 'newsletter_popup_submitted_until'

const CLOSE_HIDE_DAYS = 7
const SUBMIT_HIDE_DAYS = 90
const SHOW_DELAY_MS = 5000

const Newsletter: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const imageUrl = data.image?.url ?? ''
  const imageAlt = data.image?.alt ?? 'Newsletter popup image'
  const imageWidth = data.image?.dimensions?.width ?? 390
  const imageHeight = data.image?.dimensions?.height ?? 423

  useEffect(() => {
    if (typeof window === 'undefined') return

    const now = Date.now()

    const submittedUntil = Number(
      localStorage.getItem(NEWSLETTER_SUBMIT_KEY) || 0
    )
    if (submittedUntil && submittedUntil > now) return

    const closedUntil = Number(localStorage.getItem(NEWSLETTER_CLOSE_KEY) || 0)
    if (closedUntil && closedUntil > now) return

    const timer = window.setTimeout(() => {
      setOpen(true)
    }, SHOW_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  const setHideUntil = (key: string, days: number) => {
    const hideUntil = Date.now() + days * 24 * 60 * 60 * 1000
    localStorage.setItem(key, String(hideUntil))
  }

  const handleClose = () => {
    if (status === 'success') {
      setHideUntil(NEWSLETTER_SUBMIT_KEY, SUBMIT_HIDE_DAYS)
    } else {
      setHideUntil(NEWSLETTER_CLOSE_KEY, CLOSE_HIDE_DAYS)
    }

    setOpen(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result?.error || 'Subscription failed')
      }

      setHideUntil(NEWSLETTER_SUBMIT_KEY, SUBMIT_HIDE_DAYS)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <Modal isOpen={open} onClose={handleClose} closeBtnColor="#fff">
      {status === 'success' ? (
        <div
          style={{ backgroundColor: data.background_color || '#710525' }}
          className="m-auto flex h-100 w-full max-w-[412px] flex-col items-center justify-center p-6 text-center text-white"
        >
          <h5 className="text-2xl font-semibold md:text-[28px]">
            THANKS FOR SIGNING UP
          </h5>
          <p className="mt-4 text-sm md:mt-6">
            Check your email for confirmation and your unique code.
          </p>
        </div>
      ) : (
        <div
          style={{ backgroundColor: data.background_color || '#710525' }}
          className="flex w-full max-w-4xl flex-col text-white md:flex-row"
        >
          {!!imageUrl && (
            <div className="md:w-[390px]">
              <Image
                alt={imageAlt}
                src={imageUrl}
                width={imageWidth}
                height={imageHeight}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-[392px] text-center">
              <h5 className="text-3xl font-semibold whitespace-pre-line md:text-4xl">
                {data.title}
              </h5>

              <p className="mt-4 text-sm leading-6 md:mt-5 md:text-base">
                {data.sub_title}
              </p>

              <form onSubmit={handleEmailSubmit} className="mt-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.input_text || 'Email'}
                  className="h-11 w-full rounded-none border border-black bg-white px-4 text-black outline-none placeholder:text-gray-500"
                  required
                />

                <Button
                  type="submit"
                  className="mt-3 h-11 w-full text-lg uppercase"
                  variant="defaultOutline"
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? 'Submitting...'
                    : data.cta_text || 'Sign up now'}
                </Button>

                {status === 'error' && (
                  <p className="mt-3 text-sm text-red-200">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default Newsletter
