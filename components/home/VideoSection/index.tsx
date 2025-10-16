import {
  HomepageDocumentDataVideoBannerItem,
  Simplify,
} from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import { Link } from 'lucide-react'
import React from 'react'

interface IVideoSection {
  videos: GroupField<Simplify<HomepageDocumentDataVideoBannerItem>>
}

const VideoSection: React.FC<IVideoSection> = ({ videos }) => {
  const video = videos[0]
  return (
    <div className="relative w-full mx-3">
      <video
        src={video?.video.text || ''}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-black/30 flex flex-col justify-between items-center text-white p-4">
        <h3 className="flex flex-col items-center text-center my-auto space-y-2">
          {video?.title}
        </h3>

        <div className="uppercase">
          <Link href={video?.pathname || ''} className="text-white px-6">
            {video?.button_text}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoSection
