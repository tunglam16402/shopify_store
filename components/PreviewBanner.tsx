'use client'

import { useState } from "react"
import { PrismicPreview } from "@prismicio/next"
import { PrismicNextImage } from "@prismicio/next"
import { HomepageDocumentDataHeroBannersItem } from "@/prismicio-types"
import styles from "./style.module.css"

interface IHeroBannerPreviewProps {
  data: HomepageDocumentDataHeroBannersItem
}

export function PreviewBanner({ data }: IHeroBannerPreviewProps) {
  // State local để live-edit
  const [title, setTitle] = useState(data.title || "")
  const [lowerTitle, setLowerTitle] = useState(data.lower_title || "")
  const [title2, setTitle2] = useState(data.title_2 || "")
  const [text, setText] = useState(data.text || "")

  return (
    <PrismicPreview repositoryName="your-repo-name">
      {/* Toolbar / live edit panel */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded bg-black p-4 text-white text-sm">
        <span className="font-bold">Preview Mode</span>

        <input
          className="p-1 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit title"
        />

        <input
          className="p-1 text-black"
          value={lowerTitle}
          onChange={(e) => setLowerTitle(e.target.value)}
          placeholder="Edit lower title"
        />

        <input
          className="p-1 text-black"
          value={title2}
          onChange={(e) => setTitle2(e.target.value)}
          placeholder="Edit title 2"
        />

        <textarea
          className="p-1 text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Edit text"
        />

        <a
          href="/api/prismicio/exit-preview"
          className="mt-2 underline text-sm"
        >
          Exit Preview
        </a>
      </div>

      {/* Hero Banner */}
      <div className={styles.hero_banner_item}>
        <div className="relative h-[60%] md:h-full md:flex-1">
          <PrismicNextImage
            field={data.image}
            fill
            alt=""
            className="object-cover"
            preload
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className={styles.hero_text}>
          <h1 className="text-5xl font-extralight text-white md:text-6xl">
            {title}
            {lowerTitle && (
              <span className="px-2 font-[tangerine] text-6xl">{lowerTitle}</span>
            )}
            {title2 && title2}
          </h1>

          {text && (
            <span className="mt-6 text-center font-semibold text-white md:px-8 md:text-lg">
              {text}
            </span>
          )}
        </div>
      </div>
    </PrismicPreview>
  )
}
