'use client'

import { useState, useEffect } from 'react'

function StatusDot({ ok, label, ms }: { ok: boolean; label: string; ms?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--ground-deep)', border: `1px solid ${ok ? 'var(--ground-rim)' : 'var(--error)'}`, borderRadius: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ok ? '#3D8A4A' : '#B53A2A', boxShadow: ok ? '0 0 8px rgba(61,138,74,0.5)' : '0 0 8px rgba(181,58,42,0.5)' }} />
        <span style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {ms !== undefined && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{ms}ms</span>}
        <span style={{ fontSize: '12px', fontWeight: 600, color: ok ? '#3D8A4A' : '#B53A2A' }}>{ok ? 'Healthy' : 'Down'}</span>
      </div>
    </div>
  )
}

export function HealthStatus() {
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/health').then(r => r.json()).then(data => { setHealth(data); setLoading(false) })
  }, [])

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Running health checks...</p>

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
        <StatusDot ok={health?.db?.ok} label="Neon PostgreSQL" ms={health?.db?.ms} />
        <StatusDot ok={health?.pdf?.ok} label="PDF Generation" ms={health?.pdf?.ms} />
        <StatusDot ok={health?.clerk?.ok} label="Clerk Auth" />
        <StatusDot ok={health?.cloudinary?.ok} label="Cloudinary" />
      </div>

      {/* Error log */}
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '16px' }}>
          Recent API Errors ({health?.errors?.length || 0})
        </p>
        {health?.errors?.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No errors in the log.</p>
        ) : (
          <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', overflow: 'hidden' }}>
            {health.errors.map((e: any) => (
              <div key={e.id} style={{ padding: '10px 16px', borderBottom: '1px solid var(--ground-rim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--error)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>{e.action}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{new Date(e.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
