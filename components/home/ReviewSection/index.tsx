import { IcoStarFill } from '@/components/icons'
import PWSwiper from '@/components/ui/Swiper'
import ReviewItem from './HomeReviewItem'
import { getHomepageReviewSectionData } from './service'
import { REVIEWSECTION_BREAKPOINT } from './type'
import styles from './style.module.css'

const ReviewSection = async () => {
  const data = await getHomepageReviewSectionData()

  return (
    <section className="page-width">
      <div className="mt-12 md:mt-20 md:px-12">
        <p className={styles.heading}>From our customers</p>

        <p className={styles.subheading}>
          Need a little reassurance before you choose? Discover how customers
          felt once it arrived.
        </p>

        <div className="mt-6 md:mt-12">
          <div className="mb-3 flex items-center">
            {[...Array(5)].map((_, i) => (
              <IcoStarFill
                key={`full-${i}`}
                className="size-5 scale-135 md:size-6"
              />
            ))}
            <span className="ml-1 font-light text-gray-500">
              {data.totalFiveStarReviews} reviews
            </span>
          </div>

          <PWSwiper
            pagination={false}
            breakpoints={REVIEWSECTION_BREAKPOINT}
            className={styles.reviews_swiper}
            autoplay
          >
            {data.reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                product={review.product}
              />
            ))}
          </PWSwiper>
        </div>
      </div>
    </section>
  )
}

export default ReviewSection
