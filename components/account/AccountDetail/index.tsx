'use client'

import { useEffect, useState } from 'react'

import ChangePasswordForm from './ChangePasswordForm'

import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { logoutUser } from '@/store/slices/userSlice'
import { Customer } from '@/types/customer'
import { useRouter } from 'next/navigation'
import AddressBook from './AddressBook'
import MyProfile from './MyProfile'

interface IAccountDetail {
  customer: Customer
}

type TabKey = 'account' | 'address' | 'password'

const AccountDetail = ({ customer }: IAccountDetail) => {
  const [activeTab, setActiveTab] = useState<TabKey>('account')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.push('/account/login')
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [activeTab])

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-24 rounded-md border bg-white p-2 shadow-sm">
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
              className={`w-full rounded-md px-4 py-3 text-left text-sm font-medium transition ${
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
        <div className="rounded-md border bg-white p-4 shadow-sm md:p-6">
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
