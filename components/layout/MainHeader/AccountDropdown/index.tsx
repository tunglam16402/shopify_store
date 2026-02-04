'use client'

import { IcoLogout, IcoOrderHistory, IcoUser } from '@/components/icons'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { logoutUser } from '@/store/slices/userSlice'
import { RootState } from '@/store/store'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import DropdownLink from './DropdownLink'

const AccountDropdown = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoggedIn, customer } = useSelector((state: RootState) => state.user)

  console.log('isLoggedIn :>> ', isLoggedIn)
  const userName = customer?.firstName || customer?.email || 'User'

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleLogout = async () => {
    await dispatch(logoutUser())
    setOpen(false)
    router.push('/account/login')
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => {
          if (!isLoggedIn) {
            router.push('/account/login')
            return
          }
          setOpen((prev) => !prev)
        }}
        className="hover:[&_path]:stroke-primary hover:[&_ellipse]:stroke-primary hover:text-primary flex items-center gap-2 p-2 text-sm"
        aria-haspopup={isLoggedIn ? 'menu' : undefined}
        aria-expanded={isLoggedIn ? open : undefined}
      >
        <IcoUser className="h-6 w-6" />
        {isLoggedIn ? (
          <span className="hidden font-medium md:block">Hi, {userName}</span>
        ) : (
          <span className="hidden font-medium md:block">Login</span>
        )}
      </button>

      <div
        className={clsx(
          'absolute right-0 z-50 mt-2 w-54 rounded-lg border border-gray-200 bg-white shadow-xl transition-all duration-150',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <ul className="py-2">
          {isLoggedIn && (
            <>
              <DropdownLink
                href="/account"
                icon={<IcoUser className="h-4 w-4" />}
                onClick={() => setOpen(false)}
              >
                Profile
              </DropdownLink>

              <DropdownLink
                href="/account/order-history"
                icon={<IcoOrderHistory className="h-4 w-4" />}
                onClick={() => setOpen(false)}
              >
                Order History
              </DropdownLink>

              <DropdownLink
                href="/account/order-history"
                icon={<IcoLogout className="h-4 w-4" />}
                onClick={handleLogout}
              >
                Logout
              </DropdownLink>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AccountDropdown
