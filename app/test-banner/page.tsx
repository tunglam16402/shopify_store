import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { cacheLife } from 'next/cache'

export default async function Page() {

  
  const client = createClient()
  const page = await client.getSingle('testpage')

  return <SliceZone slices={page.data.slices} components={components} />
}
