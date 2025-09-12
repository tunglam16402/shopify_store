'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ActivateFormProps {
  activationUrl: string
}
const ActivateForm: React.FC<ActivateFormProps> = ({ activationUrl }) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleActivate = async () => {
    if (!activationUrl || !password) {
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
        setMessage('Account activated! Redirecting to login...')
        setTimeout(() => router.push('/account/login'), 2000)
      } else {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Activate your account</h1>
      <input
        type="password"
        placeholder="Set your password"
        className="border p-2 w-full rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleActivate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Activating...' : 'Activate'}
      </button>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  )
}

export default ActivateForm
