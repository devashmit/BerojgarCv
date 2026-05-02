'use client'

import Link from 'next/link'
import { LayoutTemplate, FileText, Settings, LogOut } from 'lucide-react'
import { DhakaLogo } from '@/components/dhaka'
import { UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'My CVs', icon: FileText },
  { href: '/templates', label: 'Templates', icon: LayoutTemplate },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-white border-r border-gray-100 flex flex-col z-50 shadow-sm">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-gray-100">
        <Link href="/">
          <DhakaLogo size={22} />
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-red-50 text-[#C0392B]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={17} className={isActive ? 'text-[#C0392B]' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <UserButton />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
