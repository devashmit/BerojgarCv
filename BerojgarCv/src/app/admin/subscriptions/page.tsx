import { prisma } from '@/lib/prisma'
import { StatCard } from '@/components/admin/StatCard'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Subscriptions — Admin' }

const PLAN_AMOUNT: Record<string, number> = { PRO: 299, TEAM: 999 }

export default async function AdminSubscriptionsPage() {
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  const [subscribers, proCount, teamCount, newThisMonth] = await Promise.all([
    prisma.user.findMany({
      where: { plan: { in: ['PRO', 'TEAM'] } },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, plan: true, planExpiresAt: true, createdAt: true },
    }),
    prisma.user.count({ where: { plan: 'PRO' } }),
    prisma.user.count({ where: { plan: 'TEAM' } }),
    prisma.user.count({ where: { plan: { in: ['PRO', 'TEAM'] }, createdAt: { gte: monthStart } } }),
  ])

  const mrr = proCount * 299 + teamCount * 999

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '24px' }}>Subscriptions</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <StatCard label="MRR" value={`NPR ${mrr.toLocaleString()}`} />
        <StatCard label="Active Pro" value={proCount} sub="NPR 299/mo" />
        <StatCard label="Active Team" value={teamCount} sub="NPR 999/mo" />
        <StatCard label="New This Month" value={newThisMonth} />
      </div>

      <div style={{ background: 'var(--ground-deep)', border: '1px solid var(--ground-rim)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ground-rim)' }}>
              {['Name', 'Email', 'Plan', 'Amount NPR', 'Expires', 'Joined'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscribers.map((u: any) => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--ground-rim)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-bright)', fontSize: '13px' }}>{u.name || '—'}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-body)', fontSize: '13px' }}>{u.email}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, color: u.plan === 'PRO' ? '#D4870C' : '#3D8A4A', background: u.plan === 'PRO' ? 'rgba(212,135,12,0.12)' : 'rgba(61,138,74,0.12)' }}>
                    {u.plan}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-bright)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                  {PLAN_AMOUNT[u.plan] || 0}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                  {u.planExpiresAt ? new Date(u.planExpiresAt).toLocaleDateString() : 'Never'}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
