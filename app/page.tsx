import HomePage from '@/components/home/HomePage'
import { createClient } from '@/prismicio'
import { cacheLife } from 'next/cache'

const Home = async () => {
  'use cache'
  cacheLife('days')

  const client = createClient()
  const homepage = await client.getSingle('homepage')

  return <HomePage data={homepage.data} />
}

export default Home
