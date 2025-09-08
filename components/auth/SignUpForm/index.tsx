/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { registerCustomer } from '@/actions/register'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Lable'
import { Button } from '@/components/ui/Button'

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const result = await registerCustomer(formData)

    if (!result.success) {
      setError(
        result.errors?.map((e: any) => e.message || e).join(', ') ||
          'Register Failed'
      )
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success)
    return <p>Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.</p>

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" required />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input type="tel" name="phone" id="phone" required />
      </div>

      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input type="text" name="firstName" id="firstName" />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input type="text" name="lastName" id="lastName" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" required />
      </div>


      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Đang gửi...' : 'Đăng ký'}
      </Button>
    </form>
  )
}

export default SignUpForm
