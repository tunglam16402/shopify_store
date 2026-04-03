import { FC } from 'react'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const Contact: FC = () => {
  return (
    <div className="mobile-mt layout-width flex flex-col gap-4 md:flex-row md:gap-8">
      <ContactInfo />
      <ContactForm />
    </div>
  )
}

export default Contact
