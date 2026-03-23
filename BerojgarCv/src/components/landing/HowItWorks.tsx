'use client'

import { motion } from 'framer-motion'
import { DiamondStep } from '@/components/dhaka'

const STEPS = [
  { number: '1', title: 'Choose Template', desc: 'Pick from 7 professionally designed templates for Nepal, Gulf, or Japan markets.' },
  { number: '2', title: 'Fill Details', desc: 'Enter your information with guided forms. Smart defaults help you get started fast.' },
  { number: '3', title: 'AI Enhances', desc: 'Our AI rewrites your bullet points with strong action verbs and measurable outcomes.' },
  { number: '4', title: 'Download & Apply', desc: 'Export a perfect PDF and start applying. Share via link for instant recruiter access.' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--text-bright)',
          }}>
            How It{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--dhaka-amber)' }}>Works</span>
          </h2>
        </motion.div>

        {/* Steps with connector line */}
        <div style={{ position: 'relative' }}>
          {/* Horizontal connector line behind diamonds */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--dhaka-gold), var(--dhaka-gold), transparent)',
              opacity: 0.3,
              zIndex: 0,
            }}
            className="hidden md:block"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <DiamondStep number={step.number} />
                <h3 style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: 'var(--text-bright)',
                  marginTop: '20px',
                  marginBottom: '8px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                  maxWidth: '220px',
                }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
