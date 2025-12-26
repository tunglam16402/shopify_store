import AccountPage from '@/components/account/AccountPage'
import { Suspense } from 'react'

const Account = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <AccountPage />
      </Suspense>
    </div>
  )
}

export default Account
