'use client'

import { PersonalizationConfig } from '@/components/products/ProductDetail/type'
import { useState } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function usePersonalization(personalization: PersonalizationConfig) {
  const { textBlock } = personalization

  const [values, setValues] = useState<Record<string, string>>(() =>
    textBlock.lines.reduce(
      (acc, line) => {
        acc[line.id] = ''
        return acc
      },
      {} as Record<string, string>
    )
  )

  const [font, setFont] = useState(textBlock.font)
  const [fontSize, setFontSize] = useState(textBlock.fontSize)
  const [color, setColor] = useState(textBlock.color)
  const [fontWeight, setFontWeight] = useState(textBlock.fontWeight)

  const [posX, setPosX] = useState<number | null>(null)
  const [posY, setPosY] = useState<number | null>(null)

  const safeArea = textBlock.safeArea

  const minX = safeArea?.insetX ?? 0
  const maxX = 1 - (safeArea?.insetX ?? 0)
  const minY = safeArea?.insetY ?? 0
  const maxY = 1 - (safeArea?.insetY ?? 0)

  const x = clamp(posX ?? textBlock.position.x, minX, maxX)
  const y = clamp(posY ?? textBlock.position.y, minY, maxY)

  const updateLineValue = (
    lineId: string,
    value: string,
    maxLength: number
  ) => {
    setValues((prev) => ({
      ...prev,
      [lineId]: value.slice(0, maxLength),
    }))
  }

  return {
    values,
    font,
    fontSize,
    color,
    fontWeight,
    x,
    y,
    setFont,
    setFontSize,
    setColor,
    setFontWeight,
    setPosX,
    setPosY,
    updateLineValue,
  }
}
