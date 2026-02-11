'use client'

import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/Button'
import { Customer } from '@/types/customer'
import { useState } from 'react'
import ChangeEmailSection from '../../ChangeEmailSection'
import ProfileDetailItem from '../ProfileDetailItem'
import LogoutSection from './LogoutSection'
import DeleteAccountSection from './DeleteAccountSection'

interface IProfileLoginDetails {
  customer: Customer
}

const ProfileLoginDetails = ({ customer }: IProfileLoginDetails) => {
  const [isChangeEmail, setIsChangeEmail] = useState(false)
  return (
    <div>
      <div className="mt-14">
        <h4 className="text-[26px] font-bold uppercase md:text-3xl">
          Login Details
        </h4>
        <div>
          <ProfileDetailItem label="Email" value={customer?.email} />
          <Button
            variant={'outline'}
            onClick={() => setIsChangeEmail(true)}
            className="mt-4 px-4 py-2 text-sm uppercase"
          >
            Change email
          </Button>

          <Modal
            isOpen={isChangeEmail}
            onClose={() => setIsChangeEmail(false)}
            className="w-full max-w-[750px]"
          >
            <ChangeEmailSection
              customer={customer}
              onCancel={() => setIsChangeEmail(false)}
            />
          </Modal>
        </div>
        <ProfileDetailItem label="Password" value="**********" />
      </div>

      <div className="mt-14">
        <LogoutSection />
      </div>
      <div className="mt-6 md:mt-8">
        <DeleteAccountSection />
      </div>
    </div>
  )
}

export default ProfileLoginDetails
