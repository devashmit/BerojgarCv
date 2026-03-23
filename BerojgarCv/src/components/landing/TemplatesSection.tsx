'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DhakaBorder } from '@/components/dhaka'
import { AuthGateModal } from '@/components/ui/AuthGateModal'

const TEMPLATES = [
  { id: 't1', name: 'Dhaka Heritage', ats: null, badge: 'Nepal Photo', accent: '#C0392B', desc: 'Full-width crimson header with gold rules. Photo-ready for Nepal and Gulf applications.' },
  { id: 't2', name: 'Himalaya Modern', ats: null, badge: 'Nepal Photo', accent: '#1A3A5C', desc: 'Navy sidebar with photo box, skill bars, and mountain peaks. Modern and clean.' },
  { id: 't3', name: "Jake's Resume", ats: '98%', badge: null, accent: '#111111', desc: 'Single column, zero decoration. Maximum ATS compatibility. The gold standard.' },
  { id: 't4', name: 'Zürich Executive', ats: '96%', badge: null, accent: '#1E3A5F', desc: 'Navy top/bottom bars with clean centered header. Executive-level elegance.' },
  { id: 't5', name: 'Nova Sidebar', ats: '93%', badge: null, accent: '#2D4739', desc: 'Forest green sidebar without photo. Geometric avatar and skill pills.' },
  { id: 't6', name: 'Paris Élégante', ats: '95%', badge: null, accent: '#2C1810', desc: 'Warm ivory background with espresso rules. Ornament dividers. Two-column body.' },
  { id: 't7', name: 'Rirekisho 履歴書', ats: null, badge: 'Japan JIS', accent: '#DC143C', desc: 'Japanese standard format with grid lines. Noto Serif JP throughout. Imperial era dates.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function TemplatesSection() {
  const [selected, setSelected] = useState('t3')
  const [showAuth, setShowAuth] = useState(false)

  const selectedTemplate = TEMPLATES.find(t => t.id === selected)

  const handleUseTemplate = () => {
    setShowAuth(true)
  }

  return (
    <>
      <section id="templates" style={{ padding: '100px 24px', position: 'relative' }}>
        <DhakaBorder height={8} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '60px' }}>
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
              Choose Your{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--dhaka-amber)' }}>Template</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-jakarta)',
              fontWeight: 300,
              fontSize: '16px',
              color: 'var(--text-muted)',
              marginTop: '12px',
            }}>
              7 professionally designed templates for every market
            </p>
          </motion.div>

          {/* Template grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {TEMPLATES.map(tmpl => (
              <motion.div
                key={tmpl.id}
                variants={item}
                onClick={() => setSelected(tmpl.id)}
                style={{
                  background: 'var(--ground-mid)',
                  border: `1px solid ${selected === tmpl.id ? 'rgba(192,57,43,0.5)' : 'var(--ground-rim)'}`,
                  borderRadius: 'var(--r-lg)',
                  boxShadow: selected === tmpl.id ? 'var(--shadow-glow)' : 'var(--shadow-card)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 250ms ease, box-shadow 250ms ease, background 250ms ease',
                }}
                onMouseEnter={(e) => {
                  if (selected !== tmpl.id) {
                    e.currentTarget.style.borderColor = 'rgba(192,57,43,0.35)'
                    e.currentTarget.style.background = 'var(--ground-lift)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected !== tmpl.id) {
                    e.currentTarget.style.borderColor = 'var(--ground-rim)'
                    e.currentTarget.style.background = 'var(--ground-mid)'
                  }
                }}
              >
                {/* Placeholder thumbnail */}
                <div style={{
                  width: '100%',
                  aspectRatio: '210/297',
                  background: 'var(--ground-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--ground-rim)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '24px',
                    fontWeight: 500,
                    color: 'var(--text-ghost)',
                  }}>
                    {tmpl.id.toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: '12px' }}>
                  <div style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-bright)',
                    marginBottom: '4px',
                  }}>
                    {tmpl.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: tmpl.ats ? 'var(--success)' : 'var(--dhaka-amber)',
                  }}>
                    {tmpl.ats ? `ATS ${tmpl.ats}` : tmpl.badge}
                  </div>
                </div>

                {/* Accent bar */}
                <div style={{
                  height: '3px',
                  background: tmpl.accent,
                }} />
              </motion.div>
            ))}
          </motion.div>

          {/* Selected template info banner */}
          <AnimatePresence mode="wait">
            {selectedTemplate && (
              <motion.div
                key={selectedTemplate.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                style={{
                  marginTop: '24px',
                  padding: '20px 24px',
                  background: 'var(--ground-mid)',
                  border: '1px solid var(--ground-rim)',
                  borderRadius: 'var(--r-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--text-bright)',
                    marginBottom: '4px',
                  }}>
                    {selectedTemplate.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                  }}>
                    {selectedTemplate.desc}
                  </div>
                </div>
                <button
                  onClick={handleUseTemplate}
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--text-bright)',
                    background: 'linear-gradient(135deg, var(--dhaka-crimson) 0%, var(--dhaka-deep) 100%)',
                    borderRadius: 'var(--r-md)',
                    padding: '10px 24px',
                    boxShadow: '0 4px 20px rgba(192,57,43,0.35)',
                    transition: 'transform 200ms cubic-bezier(0.34,1.2,0.64,1), box-shadow 200ms ease',
                    whiteSpace: 'nowrap',
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
                  Use This Template →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AuthGateModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  )
}
