'use client'

import Link from 'next/link'
import { LayoutTemplate } from 'lucide-react'
import { DhakaBorder, DhakaLogo } from '@/components/dhaka'
import { UserButton } from '@clerk/nextjs'

export function DashboardNav() {
  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(14,11,7,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--ground-rim)' }}>
      <DhakaBorder height={3} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/">
          <DhakaLogo size={22} />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-bright)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <LayoutTemplate size={15} />
            Templates
          </Link>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
