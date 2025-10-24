import { HomepageDocumentDataUspItem } from '@/prismicio-types'
import React from 'react'

interface IUSPItem {
  usp: HomepageDocumentDataUspItem
}

const USPItem: React.FC<IUSPItem> = ({ usp }) => {
  return (
    <div className="flex flex-col text-center font-light">
      <h4 className="text-lg uppercase md:text-2xl">{usp.title}</h4>
      <p className="text-sm mt-4 md:text-base">{usp.text}</p>
    </div>
  )
}

export default USPItem
