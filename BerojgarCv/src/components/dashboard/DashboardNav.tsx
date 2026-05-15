'use client'

import Link from 'next/link'
import { LayoutTemplate, FileText, Plus, Zap } from 'lucide-react'
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
    <aside
      className="fixed left-0 top-0 h-full w-[260px] flex flex-col z-50"
      style={{ background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="h-16 px-6 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
          <span className="text-white font-black text-xs">CV</span>
        </div>
        <div>
          <span className="text-white font-extrabold text-sm tracking-tight">BerojgarCV</span>
          <div className="text-[10px] font-medium" style={{ color: '#6366F1' }}>Professional Builder</div>
        </div>
      </div>

      {/* New CV CTA */}
      <div className="px-4 pt-5 pb-3">
        <Link
          href="/builder"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}
        >
          <Plus size={15} />
          New CV
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-1 flex flex-col gap-1">
        <p className="px-3 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Workspace
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: isActive ? '#818CF8' : 'rgba(255,255,255,0.45)',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)' }}
              onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' } }}
            >
              <Icon size={17} />
              {label}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
            </Link>
          )
        })}

        {/* Upgrade hint */}
        <div className="mt-4 mx-1 p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Zap size={13} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300">AI Bullet Improver</span>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Enhance your bullet points with one click.
          </p>
        </div>
      </nav>

      {/* User section */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <UserButton />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
