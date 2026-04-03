'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  user: any
  onClose: () => void
  onUpdate: () => void
}

export function UserDetailPanel({ user, onClose, onUpdate }: Props) {
  const [detail, setDetail] = useState<any>(null)
  const [plan, setPlan] = useState(user.plan)
  const [expiry, setExpiry] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/users/${user.id}`)
      .then(r => r.json())
      .then(setDetail)
  }, [user.id])

  async function handlePlanChange() {
    setSaving(true)
    await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, planExpiresAt: expiry || undefined }),
    })
    setSaving(false)
    onUpdate()
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        width: '360px', minWidth: '360px', background: 'var(--ground-deep)',
        border: '1px solid var(--ground-rim)', borderRadius: '12px',
        padding: '24px', overflowY: 'auto', maxHeight: '80vh',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--text-bright)', fontWeight: 700, fontSize: '16px' }}>{user.name || user.email}</h3>
        <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '4px' }}><X size={16} /></button>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>{user.email}</p>

      {/* Plan change */}
      <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--ground-mid)', borderRadius: '8px' }}>
        <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Change Plan</p>
        <select value={plan} onChange={e => setPlan(e.target.value)}
          style={{ width: '100%', padding: '8px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '6px', color: 'var(--text-bright)', fontSize: '13px', marginBottom: '8px' }}>
          <option value="FREE">Free</option>
          <option value="PRO">Pro</option>
          <option value="TEAM">Team</option>
        </select>
        <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)}
          placeholder="Expiry date (optional)"
          style={{ width: '100%', padding: '8px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '6px', color: 'var(--text-bright)', fontSize: '13px', marginBottom: '12px' }} />
        <button onClick={handlePlanChange} disabled={saving}
          style={{ width: '100%', padding: '8px', background: 'var(--dhaka-crimson)', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : 'Apply Plan Change'}
        </button>
      </div>

      {/* CVs */}
      {detail?.cvs?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>CVs ({detail.cvs.length})</p>
          {detail.cvs.slice(0, 5).map((cv: any) => (
            <div key={cv.id} style={{ padding: '8px', background: 'var(--ground-mid)', borderRadius: '6px', marginBottom: '4px', fontSize: '12px', color: 'var(--text-body)' }}>
              {cv.title} · <span style={{ color: 'var(--text-muted)' }}>{cv.templateId}</span>
            </div>
          ))}
        </div>
      )}

      {/* Activity log */}
      {detail?.logs?.length > 0 && (
        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Activity Log</p>
          {detail.logs.slice(0, 10).map((log: any) => (
            <div key={log.id} style={{ padding: '6px 8px', borderBottom: '1px solid var(--ground-rim)', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-bright)' }}>{log.action}</span>
              <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
