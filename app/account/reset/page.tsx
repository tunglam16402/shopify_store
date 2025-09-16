import { resetCustomerPassword } from '@/actions/login'
import AuthForm from '@/components/auth/AuthForm'
import React from 'react'

const ResetPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>
        <AuthForm
          label="Password "
          placeholder="Enter your new password"
          buttonText="Submit"
          fieldName="password"
          type="password"
          action={resetCustomerPassword}
        />
      </div>
    </div>
  )
}

export default ResetPage
