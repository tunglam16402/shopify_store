import { ReactNode } from 'react'

export interface PersonalizationLineConfig {
  id: string
  label: string
  maxLength: number
  required?: boolean
}

export interface PersonalizationPositionOption {
  min?: number // default 0
  max?: number // default 1
  step?: number // default 0.01
  label?: string
}

export interface PersonalizationTextBlock {
  position: {
    x: number // 0 → 1
    y: number // 0 → 1
  }
  font: string
  fontSize: 'S' | 'M' | 'L'
  color: string
  fontWeight: string
  lines: PersonalizationLineConfig[]
  safeArea: {
    insetX: number
    insetY: number
  }
}

export interface PersonalizationConfig {
  enabled: boolean
  textBlock: PersonalizationTextBlock
  options?: {
    fonts?: string[]
    colors?: string[]
    fontSizes?: Array<'S' | 'M' | 'L'>
    fontWeights?: string[]
    positionX?: PersonalizationPositionOption
    positionY?: PersonalizationPositionOption
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
