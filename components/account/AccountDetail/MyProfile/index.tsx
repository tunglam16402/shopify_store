import React, { useState } from 'react'
import AccountInfo from './ProfileInfo'
import ProfileUpdateForm from './ProfileUpdateForm'
import { Customer } from '@/types/customer'

interface IMyProfile {
  customer: Customer
}

const MyProfile = ({ customer }: IMyProfile) => {
  const [isEditingAccount, setIsEditingAccount] = useState(false)

  return (
    <div className="space-y-6">
      <AccountInfo customer={customer} />

      {!isEditingAccount ? (
        <button
          onClick={() => setIsEditingAccount(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Update account
        </button>
      ) : (
        <ProfileUpdateForm
          customer={customer}
          onCancel={() => setIsEditingAccount(false)}
        />
      )}
    </div>
  )
}

export default MyProfile
