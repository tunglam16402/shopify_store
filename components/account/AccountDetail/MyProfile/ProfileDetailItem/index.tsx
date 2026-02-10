interface ProfileDetailItemProps {
  label: string
  value?: string | null
}

const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({ label, value }) => {
  return (
    <div className="mt-4 flex items-baseline gap-2">
      <span className="text-lg font-bold tracking-wide uppercase">
        {label}:
      </span>
      <span>{value || '-'}</span>
    </div>
  )
}

export default ProfileDetailItem
