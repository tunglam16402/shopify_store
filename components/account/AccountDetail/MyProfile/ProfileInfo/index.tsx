'use client'

import { Customer } from '@/types/customer'
import React from 'react'
import ProfileInfoItem from '../ProfileInfoItem'

interface ProfileInfoProps {
  customer: Customer | null
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ customer }) => {
  return (
    <section className="">
      <h3 className="text-[26px] font-bold uppercase md:text-3xl">
        My Details
      </h3>
      <p className="mt-4 text-sm md:text-base">
        Feel free to edit any of your details below so your account is up to
        date.
      </p>
      <div className="mt-10 md:mt-14">
        <h4 className="text-[26px] font-bold uppercase md:text-3xl">Details</h4>
        <div className="">
          <ProfileInfoItem label="First Name" value={customer?.firstName} />
          <ProfileInfoItem label="Last Name" value={customer?.lastName} />
          <ProfileInfoItem
            label="Date of Birth"
            value={customer?.dateOfBirth}
          />

          <ProfileInfoItem label="Phone Number" value={customer?.phone} />
          <ProfileInfoItem label="Gender" value={customer?.gender} />
        </div>
      </div>
      <div className="mt-10 md:mt-14">
        <h4 className="text-[26px] font-bold uppercase md:text-3xl">Login Details</h4>
        <div className="">
   
          <ProfileInfoItem label="Email" value={customer?.email} />
      
        </div>
      </div>
    </section>
  )
}

export default ProfileInfo
