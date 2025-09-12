'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Lable'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { loginUser } from '@/store/slices/userSlice'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const SignInForm = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { loading, error } = useSelector((state: RootState) => state.user)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        router.push('/')
      })
      .catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}

export default SignInForm
