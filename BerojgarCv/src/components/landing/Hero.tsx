'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DhakaTexture, ThangkaMandala } from '@/components/dhaka'
import { AuthGateModal } from '@/components/ui/AuthGateModal'

const TRUST_STATS = [
  { value: '10,000+', label: 'CVs Built' },
  { value: '7', label: 'Templates' },
  { value: '98%', label: 'ATS Score' },
  { value: '3', label: 'Markets' },
]

export function Hero() {
  const [showAuth, setShowAuth] = useState(false)

  const handleCTA = () => {
    setShowAuth(true)
  }

  // Word-by-word stagger for Devanagari headline
  const devanagariWords = 'तपाईंको सपनाको'.split(' ')
  const accentWords = 'जागिर पाउनुस्।'.split(' ')

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          background: 'var(--ground-ink)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
        }}
      >
        {/* Background texture */}
        <DhakaTexture opacity={0.04} />

        {/* Radial crimson glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ThangkaMandala — top-left animating */}
        <div style={{ position: 'absolute', top: '-40px', left: '-60px', opacity: 0.12 }}>
          <ThangkaMandala size={200} color="var(--dhaka-gold)" animate reverse={false} />
        </div>

        {/* ThangkaMandala — right static */}
        <div style={{ position: 'absolute', top: '20%', right: '-40px', opacity: 0.08 }}>
          <ThangkaMandala size={140} color="var(--dhaka-crimson)" animate={false} />
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Nepal badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--ground-rim)',
              background: 'var(--ground-mid)',
              marginBottom: '28px',
            }}
          >
            <span>🇳🇵</span>
            <span style={{
              fontFamily: 'var(--font-devanagari)',
              fontSize: '13px',
              color: 'var(--dhaka-amber)',
            }}>
              नेपालको लागि बनाइएको
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              · Made for Nepal
            </span>
          </motion.div>

          {/* H1 — word-by-word stagger */}
          <h1 style={{ marginBottom: '20px', lineHeight: 1.2 }}>
            {devanagariWords.map((word, i) => (
              <motion.span
                key={`dev-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-devanagari)',
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 400,
                  color: 'var(--text-bright)',
                  marginRight: '12px',
                }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {accentWords.map((word, i) => (
              <motion.span
                key={`acc-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + (devanagariWords.length + i) * 0.06,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-fraunces)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 800,
                  color: 'var(--dhaka-amber)',
                  marginRight: '12px',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontWeight: 300,
              fontSize: '16px',
              color: 'var(--text-body)',
              maxWidth: '520px',
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            Build a professional CV in 10 minutes. 7 templates for Nepal, Gulf, and Japan.
            AI-powered bullet improver. Free PDF download. ATS-optimized.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '48px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handleCTA}
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text-bright)',
                background: 'linear-gradient(135deg, var(--dhaka-crimson) 0%, var(--dhaka-deep) 100%)',
                borderRadius: 'var(--r-md)',
                padding: '14px 32px',
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
              Start Building — Free
            </button>
            <a
              href="#templates"
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--dhaka-amber)',
                background: 'transparent',
                border: '1px solid rgba(212, 135, 12, 0.35)',
                borderRadius: 'var(--r-md)',
                padding: '14px 32px',
                transition: 'border-color 150ms ease, background 150ms ease',
                textDecoration: 'none',
                display: 'inline-block',
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
              View Templates ↓
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            {TRUST_STATS.map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '22px',
                  fontWeight: 500,
                  color: 'var(--text-bright)',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-jakarta)',
              color: 'var(--text-ghost)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Scroll
            </span>
            <div style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--dhaka-gold), transparent)',
            }} />
          </motion.div>
        </div>
      </section>

      <AuthGateModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  )
}
