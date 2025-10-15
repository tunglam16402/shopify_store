import localFont from 'next/font/local'

export const primaryFont = localFont({
  src: [
    { path: '../public/font/Literata.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--primary-font',
  display: 'swap',
})
