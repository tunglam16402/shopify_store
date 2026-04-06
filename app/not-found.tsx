import Link from 'next/link'

export const metadata = {
  title: '404 page',
}

export default function NotFound() {
  return (
    <Link
      href="/"
      className="group mx-8 flex max-w-2xl flex-col py-24 sm:mx-auto"
    >
      <h2 className="text-foreground/90 text-[clamp(80px,12vw,120px)] leading-none font-thin tracking-tight uppercase">
        Sorry.
      </h2>
      <p className="mt-6 text-3xl leading-snug font-light tracking-tight md:text-5xl">
        We couldn&apos;t find that page
      </p>
      <p className="text-foreground/70 mt-4 text-base leading-relaxed font-light md:text-lg">
        The requested page does not exist or you do not have access to it.
      </p>

      <p className="text-foreground/70 font-sub-heading mt-6 text-2xl leading-relaxed font-light md:text-3xl">
        Try searching or go to{' '}
        <span className="text-primary decoration-foreground/30 underline underline-offset-4 transition-opacity duration-300 group-hover:opacity-50">
          Printwork&apos;s home page.
        </span>
      </p>
    </Link>
  )
}
