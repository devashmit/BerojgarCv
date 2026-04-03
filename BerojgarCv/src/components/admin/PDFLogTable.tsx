'use client'

import { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const TEMPLATE_NAMES: Record<string, string> = {
  t1: 'Dhaka', t2: 'Himalaya', t3: "Jake's", t4: 'Zürich', t5: 'Nova', t6: 'Paris', t7: 'Rirekisho',
}

export function PDFLogTable() {
  const [data, setData] = useState<any>({ logs: [], successRate: 100, chartData: [] })
  const [template, setTemplate] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ template, success, page: String(page) })
    const res = await fetch(`/api/admin/pdf-logs?${params}`)
    const json = await res.json()
    setData(json)
    setLoading(false)
  }, [template, success, page])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  return (
    <div>
      {/* Warning banner */}
      {data.successRate < 95 && (
        <div style={{ padding: '12px 16px', background: 'rgba(181,58,42,0.15)', border: '1px solid var(--error)', borderRadius: '8px', marginBottom: '20px', color: 'var(--error)', fontSize: '13px', fontWeight: 600 }}>
          ⚠ PDF success rate is {data.successRate}% — below 95% threshold
        </div>
      )}

      {/* Chart */}
      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '16px' }}>
          Success Rate — Last 7 Days · <span style={{ color: data.successRate >= 95 ? '#3D8A4A' : 'var(--error)' }}>{data.successRate}%</span>
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={data.chartData?.filter((d: any) => d.success)}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--ground-rim)" />
            <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', color: 'var(--text-bright)' }} />
            <Line type="monotone" dataKey="count" stroke="#3D8A4A" strokeWidth={2} dot={false} name="Success" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <select value={template} onChange={e => { setTemplate(e.target.value); setPage(1) }}
          style={{ padding: '8px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}>
          <option value="">All Templates</option>
          {Object.entries(TEMPLATE_NAMES).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select>
        <select value={success} onChange={e => { setSuccess(e.target.value); setPage(1) }}
          style={{ padding: '8px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}>
          <option value="">All</option>
          <option value="true">Success</option>
          <option value="false">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ground-rim)' }}>
              {['User', 'Template', 'Status', 'Duration', 'Time', 'Error'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
            ) : (data.logs || []).map((log: any) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--ground-rim)', background: log.success ? 'transparent' : 'rgba(181,58,42,0.05)' }}>
                <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{log.userId.slice(0, 8)}...</td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px', background: 'rgba(192,57,43,0.15)', color: 'var(--dhaka-crimson)' }}>
                    {TEMPLATE_NAMES[log.templateId] || log.templateId}
                  </span>
                </td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: log.success ? '#3D8A4A' : 'var(--error)' }}>
                    {log.success ? '✓ OK' : '✗ Fail'}
                  </span>
                </td>
                <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {log.durationMs ? `${log.durationMs}ms` : '—'}
                </td>
                <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--error)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {log.errorMsg || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
