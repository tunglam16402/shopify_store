'use client'

import { IcoEmail, IcoSpin } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
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
    <div className="w-full flex items-center justify-center mt-6 md:mt-12 page-width">
      <div className="w-full max-w-[560px] mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
          <div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IcoEmail className="h-5 w-5" />
                </div>
                <Input
                  type="password"
                  placeholder="Set your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="h-12 pl-12 rounded-xl"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12">
              <Button
                onClick={handleActivate}
                disabled={loading}
                variant={'primary'}
                className="w-full h-12 font-semibold shadow-lg"
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
    </div>
  )
}

export default ActivateForm
