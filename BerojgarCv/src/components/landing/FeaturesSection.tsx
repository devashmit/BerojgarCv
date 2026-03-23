'use client'

import { motion } from 'framer-motion'
import { Sparkles, BarChart2, Camera, Download, Link2, Globe } from 'lucide-react'

const FEATURES = [
  { icon: Sparkles, title: 'AI Bullet Improver', desc: 'Claude AI rewrites your experience bullets with strong action verbs and measurable outcomes.' },
  { icon: BarChart2, title: 'Live ATS Score', desc: 'Real-time scoring tells you exactly how well your CV will perform with applicant tracking systems.' },
  { icon: Camera, title: 'Nepal & Gulf Ready', desc: 'Photo-enabled templates designed for Nepal, Gulf countries, and international applications.' },
  { icon: Download, title: 'One-Click PDF', desc: 'Download a perfectly formatted, text-based PDF instantly. No watermarks, no signup required.' },
  { icon: Link2, title: 'Shareable CV Link', desc: 'Get a unique link to share your CV with recruiters. Real-time, always up-to-date.' },
  { icon: Globe, title: '3 Markets', desc: 'Templates for Nepal & Gulf, International ATS, and Japan Rirekisho — all in one platform.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--text-bright)',
          }}>
            Everything You{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--dhaka-amber)' }}>Need</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-jakarta)',
            fontWeight: 300,
            fontSize: '16px',
            color: 'var(--text-muted)',
            marginTop: '12px',
          }}>
            Professional tools built specifically for Nepali job seekers
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {FEATURES.map(feature => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={item}
                style={{
                  background: 'var(--ground-mid)',
                  border: '1px solid var(--ground-rim)',
                  borderRadius: 'var(--r-lg)',
                  padding: '28px 24px',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'border-color 250ms ease, background 250ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(192,57,43,0.35)'
                  e.currentTarget.style.background = 'var(--ground-lift)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ground-rim)'
                  e.currentTarget.style.background = 'var(--ground-mid)'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--r-md)',
                    background: 'rgba(192, 57, 43, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon size={22} color="var(--dhaka-crimson)" strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: 'var(--text-bright)',
                  marginBottom: '8px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
