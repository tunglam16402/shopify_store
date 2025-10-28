import SignInForm from '@/components/auth/SignInForm'
import { Logo } from '@/components/icons'
import React from 'react'

const Login = () => {
  return (
    <div className="bg-slate-50 pt-20 ">
      <Logo className="w-full" />
      <div className="main-width">
        <div className="flex flex-col items-center justify-center mt-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Sign In
          </h1>
          <p className="text-slate-600 mt-2 max-w-[500px] text-center">
            Step into a world where imagination meets strategy — explore, shop,
            and relive every joyful move through the games and albums you love.
          </p>
        </div>
      </div>
      <SignInForm />
    </div>
  )
}

export default Login
