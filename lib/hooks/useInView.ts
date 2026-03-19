import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', triggerOnce = true } = options

  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const hasTriggered = useRef(false) 
  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    hasTriggered.current = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasTriggered.current) return 
          setInView(true)
          if (triggerOnce) {
            hasTriggered.current = true
            observer.unobserve(element) 
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, inView }
}