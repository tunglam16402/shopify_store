'use client'

import { RootState } from '@/store/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChangePasswordForm from './ChangePasswordForm'

import { logout } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import AddressBook from './AddressBook'
import MyProfile from './MyProfile'

type TabKey = 'account' | 'address' | 'password'

const AccountDetail: React.FC = () => {
  const { customer } = useSelector((state: RootState) => state.user)

  const [activeTab, setActiveTab] = useState<TabKey>('account')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/account/login')
  }

  if (!customer) {
    return <p className="text-gray-500">No customer data available</p>
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-24 rounded-xl border bg-white p-2 shadow-sm">
          {[
            { key: 'account', label: 'Account' },
            { key: 'address', label: 'Address' },
            { key: 'password', label: 'Change Password' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as TabKey)
              }}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="my-2 border-t" />

          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <section className="col-span-12 md:col-span-9">
        <div className="rounded-md border bg-white p-4 md:p-6 shadow-sm">
          {activeTab === 'account' && <MyProfile customer={customer} />}

          {activeTab === 'address' && <AddressBook customer={customer} />}

          {activeTab === 'password' && (
            <ChangePasswordForm userEmail={customer.email} />
          )}
        </div>
      </section>
    </div>
  )
}

export default AccountDetail
