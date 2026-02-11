import { Customer } from '@/types/customer'
import ProfileDetails from './ProfileDetails'
import ProfileLoginDetails from './ProfileLoginDetails'

interface IMyProfile {
  customer: Customer
}

const MyProfile = ({ customer }: IMyProfile) => {
  return (
    <div className="space-y-6">
      <h3 className="text-[26px] font-bold uppercase md:text-3xl">
        My Details
      </h3>
      <p className="mt-4 text-sm md:text-base">
        Feel free to edit any of your details below so your account is up to
        date.
      </p>
      <ProfileDetails customer={customer} />
      <ProfileLoginDetails customer={customer} />
    </div>
  )
}

export default MyProfile
