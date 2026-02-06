'use client'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import AccountInfo from './AccountInfo'
import DetailForm from './DetailForm'
import AddressList from './AddressList'
import AddressForm from './AddressForm'
import ChangePasswordForm from './ChangePasswordForm'

import { createCustomerAddressAction } from '@/actions/customer-address'
import { Address } from '@/types/customer/address'

type TabKey = 'account' | 'address' | 'password'

const AccountDetail: React.FC = () => {
  const { customer } = useSelector((state: RootState) => state.user)

  const [activeTab, setActiveTab] = useState<TabKey>('account')

  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  if (!customer) {
    return <p className="text-gray-500">No customer data available</p>
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8">
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
                setIsEditingAccount(false)
                setIsAddingAddress(false)
                setEditingAddress(null)
              }}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <section className="col-span-12 md:col-span-9">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          {/* ACCOUNT TAB */}
          {activeTab === 'account' && (
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
                <DetailForm
                  customer={customer}
                  onCancel={() => setIsEditingAccount(false)}
                />
              )}
            </div>
          )}

          {/* ADDRESS TAB */}
          {activeTab === 'address' && (
            <div className="space-y-6">
              <AddressList
                addresses={customer.addresses?.nodes ?? []}
                defaultAddressId={customer.defaultAddress?.id ?? null}
                onEditAddress={(address) => {
                  setEditingAddress(address)
                  setIsAddingAddress(false)
                }}
              />

              {!isAddingAddress && !editingAddress && (
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  Add new address
                </button>
              )}

              {isAddingAddress && (
                <AddressForm
                  actionType="create"
                  actionFn={createCustomerAddressAction}
                  onCancel={() => setIsAddingAddress(false)}
                />
              )}

              {editingAddress && (
                <AddressForm
                  actionType="edit"
                  actionFn={createCustomerAddressAction}
                  defaultValues={editingAddress}
                  onCancel={() => setEditingAddress(null)}
                />
              )}
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === 'password' && (
            <ChangePasswordForm userEmail={customer.email} />
          )}
        </div>
      </section>
    </div>
  )
}

export default AccountDetail
