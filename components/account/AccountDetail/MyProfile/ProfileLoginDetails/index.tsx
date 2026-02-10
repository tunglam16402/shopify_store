'use client'

import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'
import ProfileDetailItem from '../ProfileDetailItem'
import { Customer } from '@/types/customer'
import Modal from '@/components/common/Modal'
import ChangeEmailSection from '../../ChangeEmailForm'

interface IProfileLoginDetails {
  customer: Customer
}

const ProfileLoginDetails = ({ customer }: IProfileLoginDetails) => {
  const [isChangeEmail, setIsChangeEmail] = useState(false)
  return (
    <div>
      <div className="mt-10 md:mt-14">
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

      <div className="mt-10 md:mt-14">
        <p className="text-lg font-bold uppercase md:text-xl">
          Log out from all web browsers
        </p>
        <Button
          variant={'outline'}
          className="mt-2 flex w-full max-w-[400px] items-center justify-between py-6 uppercase md:mt-4 md:text-lg"
        >
          <div>Log me out</div>
          <div className="text-3xl">→</div>
        </Button>
        <p className="mt-2 text-sm text-gray-700 md:mt-4 md:text-base">
          This will log you out from all web browsers you have used to access
          the adidas website. To log in again, you will have to enter your
          credentials.
        </p>
      </div>
      <div className="mt-4 md:mt-6">
        <p className="text-lg font-bold uppercase md:text-xl">Manage Account</p>
        <Button
          variant={'outline'}
          className="mt-2 flex w-full max-w-[400px] items-center justify-between py-6 uppercase md:mt-4 md:text-lg"
        >
          <div>Delete account</div>
          <div className="text-3xl">→</div>
        </Button>
        <p className="mt-2 text-sm text-gray-700 md:mt-4 md:text-base">
          By deleting your account you will no longer have access to the
          information stored in your adidas account such as order history or
          your wishlist.
        </p>
      </div>
    </div>
  )
}

export default ProfileLoginDetails
