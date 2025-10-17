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

  console.log('video :>> ', video)

  return (
    <div className=' w-full mt-12'>
      <div className="relative">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="w-full h-[100vh] md:h-[calc(100vh+100px)] object-cover"
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 bg-black/30 flex flex-col justify-between items-center text-white ">
          <div className="flex flex-col items-center my-auto uppercase">
            <h3 className="text-[44px] md:text-8xl max-w-[800px] text-center font-extralight">
              {video?.title}
            </h3>
            <p className="font-bold text-lg md:mt-6 md:text-xl">
              {video?.sub_title}
            </p>
            {video?.button_text && (
              <Link href={video?.pathname || '#'}>
                <Button className="uppercase mt-10 px-12 md:px-18 md:mt-[140px] text-lg">
                  {video?.button_text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <VideoBanner field={video?.banner} />
      </div>
    </div>
  )
}

export default VideoSection
