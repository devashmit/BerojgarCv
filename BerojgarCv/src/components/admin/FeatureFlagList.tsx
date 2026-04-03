'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function FeatureFlagList() {
  const [flags, setFlags] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/flags').then(r => r.json()).then(data => setFlags(Array.isArray(data) ? data : []))
  }, [])

  async function toggle(flag: any) {
    const newEnabled = !flag.enabled
    setFlags(prev => prev.map(f => f.id === flag.id ? { ...f, enabled: newEnabled } : f))
    await fetch(`/api/admin/flags/${flag.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: newEnabled }),
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {flags.map(flag => (
        <div key={flag.id} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', background: 'var(--ground-deep)',
          border: '1px solid var(--ground-rim)', borderRadius: '12px',
        }}>
          <div>
            <p style={{ color: 'var(--text-bright)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{flag.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>{flag.description}</p>
            <p style={{ color: 'var(--text-ghost)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              {flag.id} · Updated {new Date(flag.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Animated toggle */}
          <button
            onClick={() => toggle(flag)}
            style={{
              width: '48px', height: '26px', borderRadius: '999px', position: 'relative', cursor: 'pointer',
              background: flag.enabled ? 'var(--dhaka-crimson)' : 'var(--ground-rim)',
              transition: 'background 300ms',
              flexShrink: 0,
            }}
          >
            <motion.div
              animate={{ x: flag.enabled ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                position: 'absolute', top: '3px', width: '20px', height: '20px',
                borderRadius: '50%', background: '#fff',
              }}
            />
          </button>
        </div>
      ))}
    </div>
  )
}
