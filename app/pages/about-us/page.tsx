import AboutUsPage from '@/components/infoPage/AboutUsPage'
import { createClient } from '@/prismicio'
import { cacheLife } from 'next/cache'
import React from 'react'

const AboutUs = async () => {
  'use cache'
  cacheLife('days')

  const client = createClient()
  const aboutUs = await client.getSingle('about', {
    fetchOptions: { cache: 'force-cache' },
  })

  return <AboutUsPage aboutUsData={aboutUs.data} />
}

export default AboutUs
