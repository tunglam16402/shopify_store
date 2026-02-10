import { Customer } from '@/types/customer'
import ProfileDetails from './ProfileDetails'
import ProfileLoginDetails from './ProfileLoginDetails'

interface IMyProfile {
  customer: Customer
}

const MyProfile = ({ customer }: IMyProfile) => {

  return (
    <div className="space-y-6">
      <ProfileDetails customer={customer} />
      <ProfileLoginDetails customer={customer} />


    </div>
  )
}

export default MyProfile
