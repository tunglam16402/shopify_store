
const ORDER_STEPS = [
  'packed',
  'dispatched',
  'in_transit',
  'out_for_delivery',
  'delivered',
] as const

function getActiveIndex(status: string) {
  switch (status) {
    case 'UNFULFILLED':
      return 0

    case 'IN_PROGRESS':
      return 1

    case 'PARTIALLY_FULFILLED':
      return 2

    case 'FULFILLED':
      return 4

    default:
      return 0
  }
}

function formatTitle(key: string) {
  return key.replaceAll('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export const getListSteps = (fulfillmentStatus: string) => {
  const activeIndex = getActiveIndex(fulfillmentStatus)

  return ORDER_STEPS.map((key, index) => ({
    imageSrc: `/assets/icons/order-status/${key}.svg`,
    title: formatTitle(key),
    passed: index <= activeIndex,
  }))
}
