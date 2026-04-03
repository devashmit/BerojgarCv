'use client'

import { useState, useEffect, useCallback } from 'react'
import { ExternalLink, XCircle, Trash2 } from 'lucide-react'

const TEMPLATE_NAMES: Record<string, string> = {
  t1: 'Dhaka', t2: 'Himalaya', t3: "Jake's", t4: 'Zürich', t5: 'Nova', t6: 'Paris', t7: 'Rirekisho',
}

export function CVTable() {
  const [cvs, setCvs] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [template, setTemplate] = useState('')
  const [shared, setShared] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchCVs = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ template, shared, page: String(page) })
    const res = await fetch(`/api/admin/cvs?${params}`)
    const data = await res.json()
    setCvs(data.cvs || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [template, shared, page])

  useEffect(() => { fetchCVs() }, [fetchCVs])

  async function revoke(id: string) {
    await fetch(`/api/admin/cvs/${id}/revoke`, { method: 'PATCH' })
    fetchCVs()
  }

  async function deleteCv(id: string) {
    if (!confirm('Permanently delete this CV?')) return
    await fetch(`/api/admin/cvs/${id}`, { method: 'DELETE' })
    fetchCVs()
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <select value={template} onChange={e => { setTemplate(e.target.value); setPage(1) }}
          style={{ padding: '8px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}>
          <option value="">All Templates</option>
          {Object.entries(TEMPLATE_NAMES).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select>
        <select value={shared} onChange={e => { setShared(e.target.value); setPage(1) }}
          style={{ padding: '8px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}>
          <option value="">All</option>
          <option value="true">Shared</option>
          <option value="false">Revoked</option>
        </select>
      </div>

      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ground-rim)' }}>
              {['Owner', 'Template', 'Created', 'Shared', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
            ) : cvs.map(cv => (
              <tr key={cv.id} style={{ borderBottom: '1px solid var(--ground-rim)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-bright)', fontSize: '13px' }}>{cv.user?.name || cv.user?.email || '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: 'rgba(192,57,43,0.15)', color: 'var(--dhaka-crimson)' }}>
                    {TEMPLATE_NAMES[cv.templateId] || cv.templateId}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                  {new Date(cv.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: cv.isShared ? '#3D8A4A' : 'var(--text-ghost)' }}>
                    {cv.isShared ? 'Shared' : 'Revoked'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`/preview/${cv.shareId}`} target="_blank" rel="noreferrer"
                      style={{ color: 'var(--text-muted)', cursor: 'pointer' }} title="View">
                      <ExternalLink size={14} />
                    </a>
                    {cv.isShared && (
                      <button onClick={() => revoke(cv.id)} title="Revoke sharing" style={{ color: '#C47C1A', cursor: 'pointer' }}>
                        <XCircle size={14} />
                      </button>
                    )}
                    <button onClick={() => deleteCv(cv.id)} title="Delete" style={{ color: 'var(--error)', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{total} CVs total</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '6px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '6px', color: 'var(--text-body)', fontSize: '13px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}>Prev</button>
          <button onClick={() => setPage(p => p + 1)} disabled={cvs.length < 20}
            style={{ padding: '6px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '6px', color: 'var(--text-body)', fontSize: '13px', cursor: cvs.length < 20 ? 'not-allowed' : 'pointer', opacity: cvs.length < 20 ? 0.5 : 1 }}>Next</button>
        </div>
      </div>
    </div>
  )
}
