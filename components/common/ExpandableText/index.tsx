'use client'

import React, { useState, useRef, useEffect } from 'react'

interface ExpandableTextProps {
  text: string
  lineClamp?: number
  className?: string
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  lineClamp = 4,
  className = '',
}) => {
  const [expanded, setExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
      const maxHeight = lineHeight * lineClamp
      if (el.scrollHeight > maxHeight) setShowButton(true)
    }
  }, [text, lineClamp])

  return (
    <div className={`relative ${className}`}>
      <p
        ref={textRef}
        className={`${!expanded ? `line-clamp-${lineClamp}` : ''} wrap-break-word`}
      >
        {text}
      </p>

      {showButton && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm md:text-base underline"
        >
          {expanded ? 'Read Less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default ExpandableText
