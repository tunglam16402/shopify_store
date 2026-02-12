'use client'

import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/Button'
import { Customer } from '@/types/customer'
import React, { useState } from 'react'
import ProfileDetailItem from '../ProfileDetailItem'
import ProfileUpdateForm from '../ProfileUpdateForm'

interface ProfileDetailsProps {
  customer: Customer
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ customer }) => {
  const [isEditingAccount, setIsEditingAccount] = useState(false)

  return (
    <section>
      <div className="mt-14">
        <h4 className="text-[26px] font-bold uppercase md:text-3xl">Details</h4>
        <div>
          <ProfileDetailItem label="First Name" value={customer?.firstName} />
          <ProfileDetailItem label="Last Name" value={customer?.lastName} />
          <ProfileDetailItem
            label="Date of Birth"
            value={customer?.dateOfBirth}
          />

          <ProfileDetailItem label="Phone Number" value={customer?.phone} />
          <ProfileDetailItem
            label="Gender"
            value={customer?.gender}
            valueClassName="capitalize"
          />
        </div>
      </div>

      <Button
        variant={'outline'}
        onClick={() => setIsEditingAccount(true)}
        className="mt-4 px-4 py-2 text-sm uppercase"
      >
        Edit account
      </Button>

      <Modal
        isOpen={isEditingAccount}
        onClose={() => setIsEditingAccount(false)}
        className="w-full max-w-[750px]"
      >
        <ProfileUpdateForm
          customer={customer}
          onCancel={() => setIsEditingAccount(false)}
        />
      </Modal>
    </section>
  )
}

export default ProfileDetails
