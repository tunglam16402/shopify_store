import { IcoApple, IcoGoogle } from '@/components/icons'

import { signIn } from 'next-auth/react'

const SocialLoginWrapper = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="group flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
      >
        <IcoGoogle />
        <span className="hidden sm:inline">Sign in with Google</span>
      </button>
      <button className="group flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm">
        <IcoApple className="h-5 w-5" />
        <span className="hidden sm:inline">Sign in with Apple</span>
      </button>
    </div>
  )
}

export default SocialLoginWrapper
