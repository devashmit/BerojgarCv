'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

export function AnnouncementForm() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('info')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [saving, setSaving] = useState(false)

  async function fetchAnnouncements() {
    const res = await fetch('/api/admin/announcements')
    const data = await res.json()
    setAnnouncements(Array.isArray(data) ? data : [])
  }

  useEffect(() => { fetchAnnouncements() }, [])

  async function create() {
    if (!message || !startsAt || !endsAt) return
    setSaving(true)
    await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, color, startsAt, endsAt, freeOnly }),
    })
    setMessage(''); setStartsAt(''); setEndsAt('')
    setSaving(false)
    fetchAnnouncements()
  }

  async function remove(id: string) {
    await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
    fetchAnnouncements()
  }

  const COLOR_STYLES: Record<string, string> = {
    info: '#3D8A4A', warning: '#C47C1A', error: '#B53A2A',
  }

  return (
    <div>
      {/* Create form */}
      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '20px' }}>Create Announcement</p>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Announcement message..."
          rows={3}
          style={{ width: '100%', padding: '10px 12px', background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px', resize: 'vertical', marginBottom: '12px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <select value={color} onChange={e => setColor(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}>
            <option value="info">Info (green)</option>
            <option value="warning">Warning (amber)</option>
            <option value="error">Error (red)</option>
          </select>
          <input type="datetime-local" value={startsAt} onChange={e => setStartsAt(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }} />
          <input type="datetime-local" value={endsAt} onChange={e => setEndsAt(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} />
            Free users only
          </label>
          <button onClick={create} disabled={saving || !message || !startsAt || !endsAt}
            style={{ padding: '8px 20px', background: 'var(--dhaka-crimson)', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>

      {/* Existing announcements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {announcements.map(a => (
          <div key={a.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            padding: '16px 20px', background: 'var(--ground-deep)',
            borderLeft: `4px solid ${COLOR_STYLES[a.color] || '#3D8A4A'}`,
            border: '1px solid var(--ground-rim)', borderRadius: '8px',
          }}>
            <div>
              <p style={{ color: 'var(--text-bright)', fontSize: '13px', marginBottom: '4px' }}>{a.message}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                {new Date(a.startsAt).toLocaleString()} → {new Date(a.endsAt).toLocaleString()}
                {a.freeOnly && ' · Free only'}
              </p>
            </div>
            <button onClick={() => remove(a.id)} style={{ color: 'var(--error)', cursor: 'pointer', padding: '4px' }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
