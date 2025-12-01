'use client'

import { useRef, useState } from 'react'

import { IcoEye, IcoEyeOff } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean
}

const PasswordInput = ({ disabled, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type={showPassword ? 'text' : 'password'}
        className="pr-10"
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={togglePasswordVisibility}
        disabled={disabled}
        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <IcoEyeOff className="h-5 w-5 text-gray-500" />
        ) : (
          <IcoEye className="h-5 w-5 text-gray-500" />
        )}
      </Button>
    </div>
  )
}

export default PasswordInput
