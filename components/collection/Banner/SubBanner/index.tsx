import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { BannerData } from '..'

const SubBanner = ({ bannerData }: { bannerData: BannerData }) => {
  const { CTALink, CTAText, bgColor, description, title, supportingText } =
    bannerData
  return (
    <div
      className="p-4 md:p-9  w-full flex flex-col items-center text-white"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-4xl md:text-6xl">{title}</h2>
      <p className="text-base md:text-lg font-semibold mt-6 md:mt-8">
        {description}
      </p>
      <span className="text-sm md:text-base mt-6 italic">{supportingText}</span>
      {CTALink && CTAText && (
        <Link href={CTALink || '#'} className="mt-4 md:mt-8">
          <Button
            variant={'rollingText'}
            className="px-10 py-4 text-sm md:text-base rounded uppercase"
          >
            {CTAText}
          </Button>
        </Link>
      )}
    </div>
  )
}

export default SubBanner
