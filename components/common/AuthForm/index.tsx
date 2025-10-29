'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { TypeState } from '@/types/auth'
import { Label } from '@radix-ui/react-label'
import * as React from 'react'
import { useActionState } from 'react'

interface AuthFormProps {
  label: string
  placeholder?: string
  buttonText: string
  fieldName: string
  type?: 'text' | 'email' | 'password'
  action: (formData: FormData) => Promise<TypeState>
  className?: string
  extraFields?: React.ReactNode
}

const initialState: TypeState = { success: false, message: '' }

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
  const wrappedAction = async (_prevState: TypeState, formData: FormData) => {
    return await action(formData)
  }

  const [state, formAction, pending] = useActionState(
    wrappedAction,
    initialState
  )

  return (
    <div className="w-full flex items-center justify-center mt-6 md:mt-12 main-width">
      <div className="w-full max-w-[560px] mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
          <form action={formAction} className={cn('', className)}>
            <div className="space-y-2">
              <Label
                htmlFor={fieldName}
                className="text-lg font-semibold text-slate-700"
              >
                {label}
              </Label>
              <Input
                id={fieldName}
                name={fieldName}
                type={type}
                placeholder={placeholder}
                required
                className="h-12 mt-4 rounded-xl"
              />
            </div>

            {extraFields}

            <div className="mt-12">
              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 font-semibold shadow-lg"
                disabled={pending}
              >
                {pending ? 'Processing...' : buttonText}
              </Button>
            </div>

            {state?.message && (
              <p
                className={`text-center mt-6 text-sm font-medium ${
                  state.success ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {state.message}
              </p>
            )}

            {state?.errors && state.errors.length > 0 && (
              <ul className="mt-2 text-sm text-red-500 list-disc list-inside">
                {state.errors.map((err, i) => (
                  <li key={i}>{err.message}</li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
