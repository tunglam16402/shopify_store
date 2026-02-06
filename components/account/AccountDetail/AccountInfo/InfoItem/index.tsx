interface InfoItemProps {
  label: string
  value?: string | null
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-semibold tracking-wide uppercase">
        {label}
      </span>
      <span className="text-sm text-gray-800">{value || '-'}</span>
    </div>
  )
}

export default InfoItem