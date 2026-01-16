'use client'

import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SORT_OPTIONS = [
  { label: 'Featured', value: '' },
  { label: 'Best selling', value: 'best-selling' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Date: New → Old', value: 'date-new-old' },
  { label: 'Date: Old → New', value: 'date-old-new' },
  { label: 'Alphabetical: A → Z', value: 'title-asc' },
  { label: 'Alphabetical: Z → A', value: 'title-desc' },
]

const SortByFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sortValue = searchParams.get('sort') ?? ''

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div>
      <Select
        options={SORT_OPTIONS}
        value={[sortValue]}
        onChange={(v) => onChange(v[0])}
        placeholder="Featured"
        icon={<IcoSort className="w-5 h-5" />}
        className="w-full text-sm md:text-base"
        multiple={false}
      />
    </div>
  )
}

export default SortByFilter
