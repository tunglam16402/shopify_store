'use client'

import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SORT_OPTIONS = [
  { label: 'Best selling', value: '' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SortByFilter = ({ sort }: any) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
        value={[sort]}
        onChange={(v) => onChange(v[0])}
        placeholder="Sort by: Most Relevant"
        icon={<IcoSort className="w-5 h-5" />}
        className="w-full"
        multiple={false}
      />
    </div>
  )
}

export default SortByFilter
