interface FilterMobileProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const FilterMobile = ({ open, onClose, children }: FilterMobileProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">{children}</div>

      <div className="border-t p-4">
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default FilterMobile
