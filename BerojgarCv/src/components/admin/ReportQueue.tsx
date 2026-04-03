'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, XCircle, Trash2, CheckCircle } from 'lucide-react'

export function ReportQueue() {
  const [reports, setReports] = useState<any[]>([])
  const [showResolved, setShowResolved] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchReports() {
    setLoading(true)
    const res = await fetch(`/api/admin/reports?resolved=${showResolved}`)
    const data = await res.json()
    setReports(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchReports() }, [showResolved])

  async function resolve(id: string) {
    await fetch(`/api/admin/reports/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'resolve' }) })
    fetchReports()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <input type="checkbox" checked={showResolved} onChange={e => setShowResolved(e.target.checked)} />
          Show resolved
        </label>
      </div>

      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ground-rim)' }}>
              {['Share ID', 'Reason', 'Reporter', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
            ) : reports.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No reports</td></tr>
            ) : reports.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--ground-rim)' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{r.shareId.slice(0, 8)}...</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-body)', fontSize: '13px' }}>{r.reason}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px' }}>{r.reportedBy || 'Anonymous'}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: r.resolved ? '#3D8A4A' : '#C47C1A' }}>
                    {r.resolved ? 'Resolved' : 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`/preview/${r.shareId}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }} title="View CV"><ExternalLink size={14} /></a>
                    {!r.resolved && (
                      <button onClick={() => resolve(r.id)} title="Dismiss" style={{ color: '#3D8A4A', cursor: 'pointer' }}><CheckCircle size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
