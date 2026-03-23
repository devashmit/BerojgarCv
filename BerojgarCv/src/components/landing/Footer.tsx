'use client'

import { DhakaBorder, DhakaLogo, DiamondMark } from '@/components/dhaka'
import Link from 'next/link'

const FOOTER_LINKS = {
  Templates: [
    { label: 'Dhaka Heritage', href: '#templates' },
    { label: 'Himalaya Modern', href: '#templates' },
    { label: "Jake's Resume", href: '#templates' },
    { label: 'Zürich Executive', href: '#templates' },
    { label: 'Nova Sidebar', href: '#templates' },
    { label: 'Paris Élégante', href: '#templates' },
    { label: 'Rirekisho 履歴書', href: '#templates' },
  ],
  Product: [
    { label: 'Templates', href: '#templates' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'AI Bullet Improver', href: '#features' },
  ],
  Resources: [
    { label: 'CV Writing Guide', href: '#' },
    { label: 'ATS Tips', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Support', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer style={{ position: 'relative' }}>
      <DhakaBorder height={12} />

      <div
        style={{
          background: 'var(--ground-deep)',
          padding: '60px 24px 32px',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}>
          {/* Brand column */}
          <div>
            <DhakaLogo size={28} />
            <p style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginTop: '16px',
              lineHeight: 1.6,
              maxWidth: '260px',
            }}>
              Nepal&apos;s premier CV builder. Professional templates for Nepal, Gulf, and Japan markets.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: 'var(--font-jakarta)',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--text-bright)',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontSize: '13px',
                        color: 'var(--text-body)',
                        transition: 'color 200ms ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-bright)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--ground-rim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}>
            © 2025 बेरोजगार CV · नेपालमा मायाले बनाइएको 🇳🇵
          </span>

          {/* Diamond ornaments */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <DiamondMark size={8} color="var(--dhaka-gold)" />
            <DiamondMark size={8} color="var(--dhaka-crimson)" />
            <DiamondMark size={8} color="var(--dhaka-gold)" />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              href="#"
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                transition: 'color 200ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-bright)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                transition: 'color 200ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-bright)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
