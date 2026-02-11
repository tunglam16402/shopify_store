import Modal from '@/components/common/Modal'
import { Button } from '../Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog'

interface IConfirmdDialog {
  open: boolean
  close: () => void
  onConfirm: () => void
  title: string
  subTitle?: string
  ctaText?: string
}

export function ConfirmdDialog({
  open,
  close,
  onConfirm,
  title,
  subTitle,
  ctaText = 'OK',
}: IConfirmdDialog) {
  return (
    <Modal isOpen={open} onClose={close}>
      <div className="w-full max-w-xl p-5">
        <div>
          <h2 className="max-w-md text-3xl font-bold uppercase">{title}</h2>
          <p className="mt-4 text-sm md:text-base">{subTitle}</p>
        </div>

        <div className="mt-6">
          <Button
            onClick={onConfirm}
            variant={'primary'}
            className="w-full items-center justify-between py-6 text-lg font-semibold uppercase"
          >
            <div> {ctaText}</div>
            <div className="text-3xl">→</div>
          </Button>

          <Button
            onClick={close}
            variant={'default'}
            className="mt-2 w-full items-center justify-between py-6 text-lg font-semibold uppercase"
          >
            <div>close</div>
            <div className="text-3xl">→</div>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
