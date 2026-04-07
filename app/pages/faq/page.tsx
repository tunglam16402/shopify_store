import { FAQPage } from '@/components/infoPage/FAQPage'
import faqsData from '@/public/data/faq-data.json'

const FAQ = () => {
  return (
    <div className='layout-width mobile-mt'>
      <FAQPage faqsData={faqsData} />
    </div>
  )
}

export default FAQ
