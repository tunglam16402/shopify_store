'use client'

import React from 'react'

interface RatingBarProps {
  label: string
  value?: number | null
}

const RatingBar: React.FC<RatingBarProps> = ({ label, value }) => {
  if (typeof value !== 'number') return null

  const fullBlocks = Math.floor(value)
  const partialBlock = value - fullBlocks       

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium md:text-base">{label}</span>
        <span className="text-xs text-gray-500">{value}/5</span>
      </div>

      <div className="flex space-x-1 h-4 mt-2 md:mt-3">
        {Array.from({ length: 5 }).map((_, idx) => {
          let width = '100%' 
          let bgClass = 'bg-gray-200' 

          if (idx < fullBlocks) {
            bgClass = 'bg-primary'
          } else if (idx === fullBlocks && partialBlock > 0) {
            width = `${partialBlock * 100}%`
            bgClass = 'bg-primary'
          }

          return (
            <div key={idx} className="flex-1 rounded overflow-hidden bg-gray-200 relative">
              <div
                className={`${bgClass} h-full absolute top-0 left-0 transition-all duration-500`}
                style={{ width }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(RatingBar)
