'use client'

import StyledHeading from '@/components/ui/StyledHeading'
import UnderlineInput from '@/components/ui/UnderlineInput'
import React, { useState } from 'react'

type ContactFormValues = {
  name: string
  email: string
  phone: string
  message: string
}

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [checked, setChecked] = useState(false)
  const [showCheckboxError, setShowCheckboxError] = useState(false)

  const updateValue = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    if (!values.name.trim()) return 'Please enter your name.'
    if (!values.email.trim()) return 'Please enter your email.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return 'Please enter a valid email address.'
    }
    if (!values.message.trim()) return 'Please enter your message.'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    const validationError = validateForm()
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
    <div className="bg-primary w-full p-4 text-white md:px-20 md:py-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <StyledHeading
          text="Get in touch"
          headingClass="text-3xl md:text-[42px] uppercase tracking-tighter"
          subHeadingClass="text-4xl md:text-5xl font-sub-heading"
        />

        <UnderlineInput
          type="text"
          value={values.name}
          placeholder="Name"
          onChange={(e) => updateValue('name', e.target.value)}
          className="pl-1 text-white placeholder:text-lg placeholder:text-white md:text-lg"
        />

        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <UnderlineInput
            type="email"
            value={values.email}
            placeholder="Email"
            onChange={(e) => updateValue('email', e.target.value)}
            className="pl-1 text-white placeholder:text-lg placeholder:text-white md:text-lg"
          />
          <UnderlineInput
            type="tel"
            value={values.phone}
            placeholder="Phone"
            onChange={(e) => updateValue('phone', e.target.value)}
            className="pl-1 text-white placeholder:text-lg placeholder:text-white md:text-lg"
          />
        </div>

        <UnderlineInput
          type="text"
          value={values.message}
          placeholder="Message"
          onChange={(e) => updateValue('message', e.target.value)}
          className="pb-20 pl-1 text-white placeholder:text-lg placeholder:text-white md:pb-26 md:text-lg"
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked)
                if (e.target.checked) setShowCheckboxError(false)
              }}
              className="peer accent-primary mt-0.5 h-4 w-4 cursor-pointer"
            />

            <span className="text-white transition">
              I have read and agree with Terms & Conditions
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked)
                if (e.target.checked) setShowCheckboxError(false)
              }}
              className="peer accent-primary mt-0.5 h-4 w-4 cursor-pointer"
            />

            <span className="text-white transition">
              I would like to receive more information about products, events,
              news, & offers
            </span>
          </label>

          {showCheckboxError && (
            <p className="mt-1 text-xs text-red-500">
              Please confirm before adding this product to cart.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-[140px] items-center justify-center rounded-md border border-black px-5 py-3 text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {successMessage && checked ? (
          <p className="text-sm text-green-600">{successMessage}</p>
        ) : null}

        {errorMessage || !checked ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}
      </form>
    </div>
  )
}

export default ContactForm
