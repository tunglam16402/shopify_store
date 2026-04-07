'use client'

import { Button } from '@/components/ui/Button'
import StyledHeading from '@/components/ui/StyledHeading'
import UnderlineInput from '@/components/ui/UnderlineInput'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { validateForm } from '../helper'
import { cn } from '@/lib/utils'

export type ContactFormValues = {
  name: string
  email: string
  phone: string
  message: string
  agreeTerms: boolean
  subscribeNews: boolean
}

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  agreeTerms: false,
  subscribeNews: false,
}

type Props = {
  className?: string
  formTitle?: string
  textClassName?: string
  checkboxClassName?: string
}

const ContactForm: FC<Props> = ({
  className,
  formTitle = 'Get in touch',
  textClassName = 'pl-1 text-white placeholder:text-lg placeholder:text-white md:text-lg',
  checkboxClassName = 'text-white',
}) => {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const updateValue = (
    field: keyof ContactFormValues,
    value: string | boolean
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    const validationError = validateForm(values)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to send message.')
      }

      setSuccessMessage('Your message has been sent successfully.')
      setValues(initialValues)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={cn(
        'bg-primary w-full p-4 text-white md:px-20 md:py-10',
        className
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <StyledHeading
          text={formTitle}
          headingClass="text-3xl md:text-[42px] uppercase tracking-tighter"
          subHeadingClass="text-4xl md:text-5xl font-sub-heading"
        />

        <UnderlineInput
          type="text"
          value={values.name}
          placeholder="Name"
          onChange={(e) => updateValue('name', e.target.value)}
          className={textClassName}
        />

        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <UnderlineInput
            type="email"
            value={values.email}
            placeholder="Email"
            onChange={(e) => updateValue('email', e.target.value)}
            className={textClassName}
          />
          <UnderlineInput
            type="tel"
            value={values.phone}
            placeholder="Phone"
            onChange={(e) => updateValue('phone', e.target.value)}
            className={textClassName}
          />
        </div>

        <UnderlineInput
          as="textarea"
          value={values.message}
          placeholder="Message"
          onChange={(e) => updateValue('message', e.target.value)}
          rows={4}
          className={textClassName}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2 text-xs md:text-sm">
            <input
              type="checkbox"
              checked={values.agreeTerms}
              onChange={(e) => updateValue('agreeTerms', e.target.checked)}
              className="peer accent-primary mt-0.5 h-4 w-4 cursor-pointer"
            />

            <span className={checkboxClassName}>
              I have read and agree with{' '}
              <Link href="terms" className="underline hover:opacity-80">
                Terms & Conditions
              </Link>
            </span>
          </label>

          <label className="mt-4 flex cursor-pointer items-start gap-2 text-xs md:text-sm">
            <input
              type="checkbox"
              checked={values.subscribeNews}
              onChange={(e) => updateValue('subscribeNews', e.target.checked)}
              className="peer accent-primary mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
            />

            <span className={checkboxClassName}>
              I would like to receive more information about products, events,
              news, & offers
            </span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="rollingText"
          className="w-full py-5 text-base uppercase md:text-lg"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>

        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default ContactForm
