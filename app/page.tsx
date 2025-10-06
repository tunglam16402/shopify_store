import HomePage from '@/components/home/HomePage'
import { createClient } from '@/prismicio'

const Home = async () => {
    const client = createClient()
  const { data } = await client.getSingle('homepage')
  return <HomePage data={data}/>
}

export default Home
