import { deleteCustomerAccountAction } from '@/actions/customer'
import { Button } from '@/components/ui/Button'
import { ConfirmdDialog } from '@/components/ui/ConfirmDialog'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { logoutUser } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteAccountSection = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    const result = await deleteCustomerAccountAction()

    if (result.success) {
      router.push('/')
    }
  }
  return (
    <div>
      <p className="text-lg font-bold uppercase md:text-xl">Manage Account</p>
      <Button
        variant={'outline'}
        onClick={() => setShowConfirm(true)}
        className="mt-4 flex w-full max-w-[400px] items-center justify-between py-6 uppercase md:text-lg"
      >
        <div>Delete account</div>
        <div className="text-3xl">→</div>
      </Button>
      <p className="mt-4 text-sm text-gray-700 md:text-base">
        By deleting your account you will no longer have access to the
        information stored in your adidas account such as order history or your
        wishlist.
      </p>

      <ConfirmdDialog
        onConfirm={handleDelete}
        close={() => setShowConfirm(false)}
        open={showConfirm}
        title="we're very sorry to see you go"
        subTitle="Are you sure you want to delete your printwork apps account? You’ll no longer have access to the information in your account, like your order history, wish list or athletic progress.

                If you choose to delete your account a confirmation e-mail will be sent to ."
        ctaText="Delete account"
      />
    </div>
  )
}

export default DeleteAccountSection
