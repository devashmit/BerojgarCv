'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserDetailPanel } from './UserDetailPanel'
import { Search } from 'lucide-react'

const PLAN_STYLES: Record<string, string> = {
  FREE: 'color: var(--text-muted); background: var(--ground-lift)',
  PRO: 'color: #D4870C; background: rgba(212,135,12,0.12)',
  TEAM: 'color: #3D8A4A; background: rgba(61,138,74,0.12)',
}

export function UserTable() {
  const [users, setUsers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [plan, setPlan] = useState('ALL')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ search, plan, page: String(page) })
    const res = await fetch(`/api/admin/users?${params}`)
    const data = await res.json()
    setUsers(data.users || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [search, plan, page])

  useEffect(() => {
    const t = setTimeout(fetchUsers, 300)
    return () => clearTimeout(t)
  }, [fetchUsers])

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ flex: 1 }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search by name or email..."
              style={{ width: '100%', padding: '8px 12px 8px 32px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}
            />
          </div>
          <select
            value={plan}
            onChange={e => { setPlan(e.target.value); setPage(1) }}
            style={{ padding: '8px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '8px', color: 'var(--text-bright)', fontSize: '13px' }}
          >
            <option value="ALL">All Plans</option>
            <option value="FREE">Free</option>
            <option value="PRO">Pro</option>
            <option value="TEAM">Team</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ground-rim)' }}>
                {['Name', 'Email', 'Plan', 'CVs', 'Joined'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
              ) : users.map(u => (
                <tr
                  key={u.id}
                  onClick={() => setSelected(u)}
                  style={{ borderBottom: '1px solid var(--ground-rim)', cursor: 'pointer', transition: 'background 150ms' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--ground-lift)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px', color: 'var(--text-bright)', fontSize: '13px' }}>{u.name || '—'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-body)', fontSize: '13px' }}>{u.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, ...Object.fromEntries(PLAN_STYLES[u.plan]?.split(';').map((s: string) => s.split(':').map((x: string) => x.trim())) || []) }}>
                      {u.plan}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>{u._count?.cvs ?? 0}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{total} users total</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ padding: '6px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '6px', color: 'var(--text-body)', fontSize: '13px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}>
              Prev
            </button>
            <button onClick={() => setPage(p => p + 1)} disabled={users.length < 20}
              style={{ padding: '6px 12px', background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '6px', color: 'var(--text-body)', fontSize: '13px', cursor: users.length < 20 ? 'not-allowed' : 'pointer', opacity: users.length < 20 ? 0.5 : 1 }}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && <UserDetailPanel user={selected} onClose={() => setSelected(null)} onUpdate={fetchUsers} />}
    </div>
  )
}
