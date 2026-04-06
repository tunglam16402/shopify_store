import { ContactFormValues } from './ContactForm'

export const validateForm = (values: ContactFormValues) => {
  if (!values.name.trim()) return 'Please enter your name.'
  if (!values.email.trim()) return 'Please enter your email.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return 'Please enter a valid email address.'
  }
  if (!values.message.trim()) return 'Please enter your message.'
  if (!values.agreeTerms) return 'Please agree to the Terms & Conditions.'
  return ''
}
