/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

interface IVideoBanner {
  src: string
  className: any
}

const VideoBanner = ({ src, className }: IVideoBanner) => {

  return (
    <video
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

export default VideoBanner
