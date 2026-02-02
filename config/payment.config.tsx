import {
  IcoApplePay,
  IcoGooglePay,
  IcoKlarna,
  IcoMaestro,
  IcoMasterCard,
  IcoPaypal,
  IcoShopifyPay,
  IcoVisa,
} from '@/components/icons'

export const paymentMethodsMock = [
  { id: 'paypal', icon: <IcoPaypal className="h-full w-full" /> },
  {
    id: 'mastercard',
    icon: <IcoMasterCard className="h-full w-full" />,
  },
  { id: 'visa', icon: <IcoVisa className="h-full w-full" /> },
  { id: 'applepay', icon: <IcoApplePay className="h-full w-full" /> },
  { id: 'googlepay', icon: <IcoGooglePay className="h-full w-full" /> },
  {
    id: 'klarna',
    icon: <IcoKlarna className="h-full w-full" />,
  },
  {
    id: 'maestro',
    icon: <IcoMaestro className="h-full w-full" />,
  },
  {
    id: 'shopifypay',
    icon: <IcoShopifyPay className="h-full w-full" />,
  },
]
