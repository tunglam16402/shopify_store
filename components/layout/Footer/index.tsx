import { FooterDocumentData, Simplify } from '@/prismicio-types'
import React from 'react'

interface IFooter {
  data: Simplify<FooterDocumentData>
}

const Footer: React.FC<IFooter> = ({ data }) => {
  const newsletterData = data.newsletter[0]
  return (
    <footer className="bg-primary">
      <div className="main-width text-white">
        {/* newsletter */}
        <div>
          <h3>{newsletterData?.title}</h3>
          <p>{newsletterData?.description}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
