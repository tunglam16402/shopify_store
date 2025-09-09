'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import Link from 'next/link'

interface AccountDropdownProps {
  isLoggedIn: boolean
  userName?: string
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  isLoggedIn,
  userName,
}) => {
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => setOpen((prev) => !prev)

  return (
    <div className="relative">
      {/* Nút Account */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition"
      >
        <User className="w-6 h-6" />
        {isLoggedIn && <span>{userName}</span>}
      </button>

      {/* Dropdown */}
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
                  href="/account/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    // call logout function
                    setOpen(false)
                  }}
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
