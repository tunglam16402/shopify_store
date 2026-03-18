import PWSwiper from '@/components/ui/Swiper'
import Image from 'next/image'
import Link from 'next/link'
import styles from './style.module.css'

interface IShopByCategory {
  subCategories: {
    title: string
    url: string
    image?: string
  }[]
}

const COLLECTION_BREAKPOINT = {
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 7,
    slidesPerGroup: 7,
    spaceBetween: 16,
  },
}

const ShopByCategory = ({ subCategories }: IShopByCategory) => {
  if (!subCategories || subCategories.length === 0) return null

  return (
    <PWSwiper
      pagination={false}
      breakpoints={COLLECTION_BREAKPOINT}
      freeMode
      className={styles.pw_swiper}
    >
      {subCategories.map((subCategory) => (
        <Link
          href={subCategory.url}
          key={subCategory.url}
          className="relative inline-block h-28 w-full md:h-32"
        >
          <Image
            src={subCategory.image || ''}
            alt=""
            fill
            className="rounded-sm object-cover md:rounded-lg"
            sizes="(max-width: 768px) 20vw, 40vw"
          />
          {!!subCategory.title && (
            <>
              <span aria-hidden className={styles.overlay} />
              <span className={styles.label}>{subCategory.title}</span>
            </>
          )}
        </Link>
      ))}
    </PWSwiper>
  )
}

export default ShopByCategory
