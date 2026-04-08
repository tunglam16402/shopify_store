import { Button } from '@/components/ui/Button'
import {
  HomepageDocumentDataVideoBannerItem,
  Simplify,
} from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import Link from 'next/link'
import React from 'react'
import VideoBanner from './VideoBanner'

interface IVideoSection {
  videos: GroupField<Simplify<HomepageDocumentDataVideoBannerItem>>
}

const VideoSection: React.FC<IVideoSection> = ({ videos }) => {
  const video = videos[0]
  const videoUrl = video?.video && 'url' in video.video ? video.video.url : ''

  return (
    <div className="mt-12 w-full">
      <div className="relative">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="h-screen w-full object-cover md:h-[calc(100dvh+500px)]"
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-between bg-black/30 text-white">
          <div className="my-auto flex flex-col items-center uppercase">
            <h3 className="max-w-[800px] text-center text-[44px] font-extralight md:text-8xl">
              {video?.title}
            </h3>
            <p className="text-lg font-bold md:mt-6 md:text-xl">
              {video?.sub_title}
            </p>
            {video?.button_text && (
              <Link href={video?.pathname || '#'}>
                <Button
                  className="mt-10 px-12 text-lg uppercase md:mt-[140px] md:px-18"
                  variant={'rollingText'}
                >
                  {video?.button_text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <VideoBanner field={video?.banner} />
    </div>
  )
}

export default VideoSection
