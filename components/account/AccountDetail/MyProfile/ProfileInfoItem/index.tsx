interface ProfileInfoItemProps {
  label: string
  value?: string | null
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-baseline gap-2 mt-4">
      <span className="font-bold text-lg tracking-wide uppercase">{label}:</span>
      <span className="text-gray-800">{value || '-'}</span>
    </div>
  )
}

export default ProfileInfoItem
