import { IcoApple, IcoGoogle } from '@/components/icons'
import React from 'react'

const SocialLoginWrapper = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm transition-all duration-200 font-medium text-slate-700 group">
        <IcoGoogle />
        <span className="hidden sm:inline">Sign in with Google</span>
      </button>
      <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm transition-all duration-200 font-medium text-slate-700 group">
        <IcoApple className="w-5 h-5" />
        <span className="hidden sm:inline">Sign in with Apple</span>
      </button>
    </div>
  )
}

export default SocialLoginWrapper
