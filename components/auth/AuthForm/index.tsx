'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface AuthFormProps {
  label: string
  placeholder?: string
  buttonText: string
  fieldName: string
  type?: 'text' | 'email' | 'password'
  action: any
  className?: string
  extraFields?: React.ReactNode
}

export default function AuthForm({
  label,
  placeholder,
  fieldName,
  type = 'text',
  action,
  className,
  buttonText,
  extraFields,
}: AuthFormProps) {
  return (
    <form
      action={action}
      className={cn('space-y-4 max-w-sm mx-auto', className)}
    >
      <div className="space-y-2">
        <Label htmlFor={fieldName} className="text-sm font-medium">
          {label}
        </Label>
        <Input
          id={fieldName}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          required
        />
      </div>

      {extraFields}

      <Button type="submit" className="w-full text-white">
        {buttonText}
      </Button>
    </form>
  )
}
