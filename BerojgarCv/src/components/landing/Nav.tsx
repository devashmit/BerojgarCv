'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { DhakaBorder, DhakaLogo } from '@/components/dhaka'
import { AuthGateModal } from '@/components/ui/AuthGateModal'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Templates', href: '#templates' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 40], ['rgba(14,11,7,0)', 'rgba(14,11,7,0.92)'])
  const blur = useTransform(scrollY, [0, 40], ['blur(0px)', 'blur(16px)'])
  const [showAuth, setShowAuth] = useState(false)

  const handleCTA = () => {
    setShowAuth(true)
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <DhakaBorder height={4} />
        <motion.nav
          style={{
            backgroundColor: bg,
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <DhakaLogo size={28} />
            </Link>

            {/* Center links */}
            <div
              style={{
                display: 'flex',
                gap: '32px',
                alignItems: 'center',
              }}
              className="hidden md:flex"
            >
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--text-body)',
                    transition: 'color 200ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-bright)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right buttons */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link
                href="/sign-in"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--dhaka-amber)',
                  background: 'transparent',
                  border: '1px solid rgba(212, 135, 12, 0.35)',
                  borderRadius: 'var(--r-md)',
                  padding: '8px 20px',
                  transition: 'border-color 150ms ease, background 150ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 135, 12, 0.70)'
                  e.currentTarget.style.background = 'rgba(212, 135, 12, 0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 135, 12, 0.35)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Sign In
              </Link>
              <button
                onClick={handleCTA}
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-bright)',
                  background: 'linear-gradient(135deg, var(--dhaka-crimson) 0%, var(--dhaka-deep) 100%)',
                  borderRadius: 'var(--r-md)',
                  padding: '8px 20px',
                  boxShadow: '0 4px 20px rgba(192,57,43,0.35)',
                  transition: 'transform 200ms cubic-bezier(0.34,1.2,0.64,1), box-shadow 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(192,57,43,0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(192,57,43,0.35)'
                }}
              >
                Build Free →
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <AuthGateModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  )
}
