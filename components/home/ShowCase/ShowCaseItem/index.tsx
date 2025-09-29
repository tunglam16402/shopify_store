import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ShowCaseItem = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative w-full">
        <Image
          src="/boardgame_collection.webp"
          alt="Board Game Collection"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
        {/* <div className="absolute inset-0 " /> */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-between items-center text-white p-4">
          <div className="flex flex-col items-center text-center my-auto">
            <div className="text-3xl">
              <span className="font-[tangerine] text-4xl">Cozy</span>
              <span> NIGHTS,</span>
            </div>
            <div className="text-3xl">
              <span>CLASSIC</span>
              <span className="font-[tangerine] text-4xl"> play</span>
            </div>
          </div>

          {/* Button bottom */}
          <div className="uppercase">
            <Link
              href="/collection/boardgame"
              className=" text-white px-6"
            >
              Board Games
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowCaseItem
