'use client'

import PasswordInput from '@/components/common/PasswordInput'
import { IcoSpin } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ActivateFormProps {
  activationUrl: string
}
const ActivateForm: React.FC<ActivateFormProps> = ({ activationUrl }) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleActivate = async () => {
    if (!activationUrl || !password) {
      setIsSuccess(false)
      setMessage('Missing activation URL or password')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/customer/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activationUrl, password }),
      })
      const data = await res.json()
      if (data.success) {
        setIsSuccess(true)
        setMessage('Account activated! Redirecting to login...')
        setTimeout(() => router.push('/account/login'), 2000)
      } else {
        setIsSuccess(false)
        setMessage(data.error || 'Activation failed')
      }
    } catch (err) {
      console.error('Error has occured:', err)
      setMessage('Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-width mt-6 flex w-full items-center justify-center md:mt-12">
      <div className="mt-6 w-full max-w-[560px]">
        <div className="rounded-2xl bg-white p-4 shadow-xl md:p-8">
          <div className="relative">
            <PasswordInput
              type="password"
              placeholder="Set your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-12 rounded-xl pl-12"
              label="Password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <Button
              onClick={handleActivate}
              disabled={loading}
              variant={'primary'}
              className="h-12 w-full font-semibold shadow-lg"
            >
              {loading ? (
                <>
                  <IcoSpin />
                  Activating...
                </>
              ) : (
                <>Activate</>
              )}
            </Button>
          </div>
          {message && (
            <p
              className={`mt-4 text-sm font-medium ${
                isSuccess ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivateForm
