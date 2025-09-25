'use client'

import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { logoutUser } from '@/store/slices/userSlice'
import { RootState } from '@/store/store'
import { User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const AccountDropdown = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoggedIn, customer } = useSelector((state: RootState) => state.user)

  const toggleDropdown = () => setOpen((prev) => !prev)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    setOpen(false)
    router.push('/account/login')
  }

  const userName = customer?.firstName || customer?.email || 'User'

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 py-2 rounded hover:bg-gray-100 transition"
      >
        <User className="w-6 h-6" />
        {isLoggedIn && <span>{userName}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          {!isLoggedIn ? (
            <ul className="flex flex-col">
              <li>
                <Link
                  href="/account/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/account/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col">
              <li className="px-4 py-2 text-gray-700">Hello, {userName}</li>
              <li>
                <Link
                  href="/account"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default AccountDropdown
