import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import styles from './style.module.css'

const HeroSection = () => {
  return (
    <section className={styles.hero_banner}>
      <div className="relative h-[60%] md:flex-1 md:h-full">
        <Image
          src="/hero_banner_fall.webp"
          alt="hero banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className={styles.hero_text}>
        <h1 className="text-white font-extralight text-5xl md:text-6xl">
          FALLING
          <span className="font-[tangerine] text-6xl px-2">for</span>
          <wbr />
          <span>FALL</span>
        </h1>

        <span className="text-white font-semibold mt-6 md:text-lg">
          A season for connection, made with pieces designed for moments
          together.
        </span>
        <Button className="uppercase mt-6 px-12 md:px-16">Shop the fall edit</Button>
      </div>
    </section>
  )
}

export default HeroSection
