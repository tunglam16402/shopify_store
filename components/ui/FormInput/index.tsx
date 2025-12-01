'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

interface FormInputProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({ name, label, type = 'text', placeholder, disabled }) => {
//   const { register, formState: { errors } } = useFormContext()

  return (
    <div className="mb-4">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        // {...register(name)}
        className="h-12"
        disabled={disabled}
      />
      {/* {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]?.message as string}</p>
      )} */}
    </div>
  )
}
