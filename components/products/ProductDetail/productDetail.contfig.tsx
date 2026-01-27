import { ProductInfoItem } from './type'

export const FIXED_INFOS: ProductInfoItem[] = [
  {
    id: 3,
    title: 'Shipping & Returns',
    descriptionNode: (
      <>
        <strong>Express shipping available for €15</strong> — order before 1 PM
        for next business day delivery.
        <br />
        <strong>Free shipping on orders over €69</strong> — available in all
        markets.
        <br />
        <strong>30-days return policy</strong> — try it out, love it or return
        it.
      </>
    ),
  },
  {
    id: 4,
    title: 'Payment Options',
    descriptionNode: (
      <>
        <strong>Secure and trusted payments with:</strong>
        <br />
        <br />
        Klarna
        <br />
        PayPal
        <br />
        American Express
        <br />
        Visa
        <br />
        Mastercard
        <br />
        Apple Pay
        <br />
        Google Pay
        <br />
        Maestro
        <br />
        UnionPay
        <br />
        Shop Pay
      </>
    ),
  },
  {
    id: 5,
    title: 'Contact Information',
    descriptionNode: (
      <>
        Printworks
        <br />
        Birger Jarlsgatan 55
        <br />
        11145 Stockholm SE
        <br />
        info@printworksmarket.com
      </>
    ),
  },
]

export const USP = [
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
