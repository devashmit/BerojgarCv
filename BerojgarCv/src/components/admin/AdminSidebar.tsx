'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DhakaBorder } from '@/components/dhaka/DhakaBorder'
import { DhakaLogo } from '@/components/dhaka/DhakaLogo'
import {
  LayoutDashboard, Users, CreditCard, FileText,
  Link2, Flag as FlagIcon, Megaphone, Activity,
  AlertTriangle, BarChart2,
} from 'lucide-react'

const NAV = [
  {
    group: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    group: 'Users',
    items: [
      { href: '/admin/users', label: 'All Users', icon: Users },
      { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
    ],
  },
  {
    group: 'Content',
    items: [
      { href: '/admin/cvs', label: 'All CVs', icon: FileText },
      { href: '/admin/reports', label: 'Flagged Reports', icon: AlertTriangle },
    ],
  },
  {
    group: 'System',
    items: [
      { href: '/admin/pdf-logs', label: 'PDF Logs', icon: BarChart2 },
      { href: '/admin/flags', label: 'Feature Flags', icon: FlagIcon },
      { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
      { href: '/admin/health', label: 'System Health', icon: Activity },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        background: 'var(--ground-deep)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid var(--ground-rim)',
        overflow: 'hidden',
      }}
    >
      {/* Top border */}
      <DhakaBorder height={4} />

      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--ground-rim)' }}>
        <DhakaLogo size={20} />
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          marginTop: '4px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        {NAV.map(({ group, items }) => (
          <div key={group} style={{ marginBottom: '20px' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--text-ghost)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '0 8px',
              marginBottom: '4px',
            }}>
              {group}
            </p>
            {items.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    marginBottom: '2px',
                    background: isActive ? 'var(--dhaka-crimson)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-body)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'background 150ms, color 150ms',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--ground-lift)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom border */}
      <DhakaBorder height={4} />
    </div>
  )
}
