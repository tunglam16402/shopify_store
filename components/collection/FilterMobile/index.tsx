import { Button } from '@/components/ui/Button'
import { useFilterProduct } from '@/lib/hooks/useFilterProduct'

interface FilterMobileProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  resultsCount?: number
}

const FilterMobile = ({
  open,
  onClose,
  children,
  resultsCount,
}: FilterMobileProps) => {
  const { actions } = useFilterProduct()
  const {clearAll} = actions
  

  if (!open) return null

  return (
    <div className="fixed inset-0 z-49 bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">{children}</div>

      <div className="border-t p-3 space-y-2 ">
        <Button
          onClick={() => clearAll()}
          className="w-full py-6 rounded-lg text-base"
          variant={'outline'}
        >
          Clear Filters
        </Button>
        <Button
          onClick={onClose}
          className="w-full py-6 rounded-lg text-base"
          variant={'primary'}
        >
          View {resultsCount} Results
        </Button>
      </div>
    </div>
  )
}

export default FilterMobile
