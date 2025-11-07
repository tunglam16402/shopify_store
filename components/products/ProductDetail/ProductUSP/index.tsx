import Image from 'next/image'
import React from 'react'

const USP = [
  {
    id: 1,
    imageUrl: '/assets/USP/usp_payment.avif',
    title: 'KLARNA/PAYPAL PAYMENTS',
  },
  {
    id: 2,
    imageUrl: '/assets/USP/usp_shipping.avif',
    title: 'FREE SHIPPING above 69$',
  },
  {
    id: 3,
    imageUrl: '/assets/USP/usp_deliverer.avif',
    title: 'FAST DELIVERIES',
  },
  {
    id: 4,
    imageUrl: '/assets/USP/usp_return.avif',
    title: 'EASY RETURNS',
  },
  {
    id: 5,
    imageUrl: '/assets/USP/usp_review.avif',
    title: '300 000+ HAPPY CUSTOMERS',
  },
]

const ProductUSP = () => {
  return (
    <div className='flex gap-4 justify-center'>
      {USP.map((usp) => (
        <div key={usp.id} className='flex flex-col items-center flex-1 text-center'>
          <Image src={usp.imageUrl} alt="" width={50} height={30} />
          <p className='text-[8px] md:text-xs'>{usp.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductUSP
