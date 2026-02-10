'use client'

import { Customer } from '@/types/customer'
import { useState } from 'react'
import ChangeEmailForm from './Form'
import VerifyPasswordForm from './VerifyPasswordForm'

interface IChangeEmailSection {
  customer: Customer
  onCancel: () => void
}

const ChangeEmailSection = ({ customer, onCancel }: IChangeEmailSection) => {
  const [verified, setVerified] = useState(false)

  return (
    <>
      {!verified && (
        <VerifyPasswordForm
          onVerified={() => setVerified(true)}
          email={customer?.email}
          onCancel={onCancel}
        />
      )}
      {verified && (
        <ChangeEmailForm
          onCancel={onCancel}
        />
      )}
    </>
  )
}

export default ChangeEmailSection
