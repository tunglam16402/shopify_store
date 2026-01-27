import { ReactNode } from "react"

export interface PersonalizationLineConfig {
  id: string
  label: string
  maxLength: number
  required?: boolean
}

export interface PersonalizationTextBlock {
  position: {
    x: number // 0 → 1
    y: number // 0 → 1
  }
  lineGap: number // 0 → 1
  font: string
  fontSize: 'S' | 'M' | 'L'
  color: string
  lines: PersonalizationLineConfig[]
}

export interface PersonalizationConfig {
  enabled: boolean
  textBlock: PersonalizationTextBlock
  options?: {
    fonts?: string[]
    colors?: string[]
    fontSizes?: Array<'S' | 'M' | 'L'>
  }
}

export type ProductImageProps = {
  images: string[]
  altText?: string
  title: string
}


export interface IProductInfoProps {
  description: string 
  information: string 
}

export interface ProductInfoItem {
  id: number
  title: string
  descriptionHtml?: string
  descriptionNode?: ReactNode
}