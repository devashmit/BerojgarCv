'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThangkaMandala } from '@/components/dhaka'
import { AuthGateModal } from '@/components/ui/AuthGateModal'

export function CTASection() {
  const [showAuth, setShowAuth] = useState(false)

  const handleCTA = () => {
    setShowAuth(true)
  }

  return (
    <>
      <section
        style={{
          padding: '120px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ThangkaMandala left animating */}
        <div style={{ position: 'absolute', top: '10%', left: '-80px', opacity: 0.1 }}>
          <ThangkaMandala size={280} color="var(--dhaka-gold)" animate reverse={false} />
        </div>

        {/* ThangkaMandala right reverse */}
        <div style={{ position: 'absolute', bottom: '10%', right: '-60px', opacity: 0.08 }}>
          <ThangkaMandala size={200} color="var(--dhaka-crimson)" animate reverse />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--text-bright)',
            marginBottom: '12px',
          }}>
            <span style={{
              fontFamily: 'var(--font-devanagari)',
              fontWeight: 400,
            }}>
              तपाईंको भविष्य
            </span>
            {' '}
            <span style={{ fontStyle: 'italic', color: 'var(--dhaka-amber)' }}>
              आज सुरु गर्नुहोस्
            </span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-jakarta)',
            fontWeight: 300,
            fontSize: '16px',
            color: 'var(--text-body)',
            marginBottom: '32px',
            lineHeight: 1.7,
          }}>
            Join thousands of Nepali job seekers who landed their dream job
            with a professionally crafted CV.
          </p>

          <button
            onClick={handleCTA}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--text-bright)',
              background: 'linear-gradient(135deg, var(--dhaka-crimson) 0%, var(--dhaka-deep) 100%)',
              borderRadius: 'var(--r-md)',
              padding: '16px 40px',
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
            Build Your CV Now — Free
          </button>

          <p style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginTop: '20px',
            lineHeight: 1.6,
          }}>
            No account required · No credit card · Instant PDF · Photo optional
          </p>
        </motion.div>
      </section>

      <AuthGateModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  )
}
