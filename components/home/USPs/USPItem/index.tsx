import { HomepageDocumentDataUspItem } from '@/prismicio-types'
import React from 'react'

interface IUSPItem {
    usp: HomepageDocumentDataUspItem
}

const USPItem:React.FC<IUSPItem> = ({usp}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h4>{usp.title}</h4>
      <p>{usp.text}</p>
    </div>
  )
}

export default USPItem
