import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

export const downloadInvoice = (name: string) => {
  const input = document.getElementById('invoice-dowload')
  html2canvas(input as HTMLElement, { scale: 6 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    const doc = new jsPDF('p', 'mm')
    let position = 0
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      doc.addPage()
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    window.open(doc.output('bloburl'))
    doc.save(`invoice-${name}.pdf`)
  })
}
