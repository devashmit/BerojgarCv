'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { DhakaBorder } from '@/components/dhaka'
import { DhakaLogo } from '@/components/dhaka'

interface AuthGateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthGateModal({ isOpen, onClose }: AuthGateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(14, 11, 7, 0.8)',
              zIndex: 200,
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <div
              style={{
                background: 'var(--ground-mid)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--shadow-modal)',
                overflow: 'hidden',
              }}
            >
              {/* DhakaBorder at top */}
              <DhakaBorder height={8} />

              <div style={{ padding: '32px 28px', textAlign: 'center' }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <DhakaLogo size={36} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontWeight: 800,
                    fontSize: '22px',
                    color: 'var(--text-bright)',
                    marginBottom: '8px',
                  }}
                >
                  Sign in to Build Your CV
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    marginBottom: '28px',
                    lineHeight: 1.5,
                  }}
                >
                  Free forever · No credit card
                </p>

                {/* Google OAuth button */}
                <a
                  href="/sign-in"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '12px 20px',
                    background: 'var(--text-bright)',
                    color: 'var(--ground-ink)',
                    borderRadius: 'var(--r-md)',
                    fontFamily: 'var(--font-jakarta)',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'opacity 200ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 2.58Z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </a>

                {/* Email sign-in ghost button */}
                <a
                  href="/sign-in"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px 20px',
                    marginTop: '12px',
                    background: 'transparent',
                    border: '1px solid rgba(212, 135, 12, 0.35)',
                    color: 'var(--dhaka-amber)',
                    borderRadius: 'var(--r-md)',
                    fontFamily: 'var(--font-jakarta)',
                    fontWeight: 600,
                    fontSize: '14px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'border-color 150ms ease, background 150ms ease',
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
                  Continue with Email
                </a>

                {/* Sign in link */}
                <p
                  style={{
                    marginTop: '20px',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-jakarta)',
                  }}
                >
                  Already have an account?{' '}
                  <a
                    href="/sign-in"
                    style={{
                      color: 'var(--dhaka-amber)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
