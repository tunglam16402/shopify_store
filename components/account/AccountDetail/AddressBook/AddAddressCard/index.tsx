'use client'

import React from 'react'

interface IAddAddressCard {
  onClick: () => void
}

const AddAddressCard: React.FC<IAddAddressCard> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[220px] flex-col items-start justify-between border-2 border-dashed border-gray-300 p-4 hover:border hover:border-solid hover:border-black"
    >
      <span className="text-sm font-medium md:text-base">Add New Address</span>
      <div className="mb-2 text-4xl transition-transform group-hover:scale-110">
        +
      </div>
    </button>
  )
}

export default AddAddressCard
