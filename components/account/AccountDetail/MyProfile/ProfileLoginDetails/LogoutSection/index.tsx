'use client'

import { Button } from '@/components/ui/Button'
import { ConfirmdDialog } from '@/components/ui/ConfirmDialog'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { logoutUser } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LogoutSection = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleConfirm = async () => {
    await dispatch(logoutUser())
    router.push('/account/login')
  }

  return (
    <div>
      <p className="text-lg font-bold uppercase md:text-xl">
        Log out from all web browsers
      </p>

      <Button
        variant={'outline'}
        className="mt-4 flex w-full max-w-[400px] items-center justify-between py-6 uppercase md:text-lg"
        onClick={() => setShowConfirm(true)}
      >
        <div>Log me out</div>
        <div className="text-3xl">→</div>
      </Button>
      <p className="mt-4 text-sm text-gray-700 md:text-base">
        This will log you out from all web browsers you have used to access the
        adidas website. To log in again, you will have to enter your
        credentials.
      </p>

      <ConfirmdDialog
        onConfirm={handleConfirm}
        close={() => setShowConfirm(false)}
        open={showConfirm}
        title="Log out of all web browsers?"
        subTitle="Are you sure you want to log out from all of your web browsers?"
        ctaText="Yes, log me out"
      />
    </div>
  )
}

export default LogoutSection
