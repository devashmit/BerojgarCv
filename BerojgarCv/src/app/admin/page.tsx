import { StatCard } from '@/components/admin/StatCard'
import { AdminCharts } from '@/components/admin/AdminCharts'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin Dashboard' }

const TEMPLATE_NAMES: Record<string, string> = {
  t1: 'Dhaka Heritage', t2: 'Himalaya Modern', t3: "Jake's Resume",
  t4: 'Zürich Executive', t5: 'Nova Sidebar', t6: 'Paris Élégante', t7: 'Rirekisho',
}

export default async function AdminPage() {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart); weekStart.setDate(weekStart.getDate() - 7)
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const [
    totalUsers, usersToday, usersThisWeek,
    totalCVs, cvsToday,
    pdfToday,
    errors,
    proCount, teamCount,
    signupsByDay, templateStats,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.cV.count(),
    prisma.cV.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.pDFLog.count({ where: { success: true, createdAt: { gte: todayStart } } }),
    prisma.auditLog.count({ where: { action: { startsWith: 'error.' }, createdAt: { gte: last24h } } }),
    prisma.user.count({ where: { plan: 'PRO' } }),
    prisma.user.count({ where: { plan: 'TEAM' } }),
    prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "User"
      WHERE "createdAt" >= ${new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)}
      GROUP BY DATE("createdAt") ORDER BY date ASC
    `,
    prisma.$queryRaw<{ templateId: string; count: bigint }[]>`
      SELECT "templateId", COUNT(*) as count FROM "CV"
      GROUP BY "templateId" ORDER BY count DESC
    `,
  ])

  const mrr = proCount * 299 + teamCount * 999
  const activeSubs = proCount + teamCount

  const signupData = (signupsByDay as any[]).map((r: any) => ({
    date: String(r.date).slice(5), count: Number(r.count),
  }))
  const templateData = (templateStats as any[]).map((r: any) => ({
    name: TEMPLATE_NAMES[r.templateId] ?? r.templateId,
    count: Number(r.count),
  }))

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '28px', color: 'var(--text-bright)', marginBottom: '8px' }}>
        Overview
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
        Is everything okay? Is the product growing? Is anyone paying?
      </p>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <StatCard label="Total Users" value={totalUsers} sub={`+${usersToday} today · +${usersThisWeek} this week`} />
        <StatCard label="CVs Created" value={totalCVs} sub={`+${cvsToday} today`} />
        <StatCard label="PDF Downloads" value={pdfToday} sub="today" />
        <StatCard label="Active Subscriptions" value={activeSubs} sub={`${proCount} Pro · ${teamCount} Team`} />
        <StatCard label="Monthly Revenue" value={`NPR ${mrr.toLocaleString()}`} sub="estimated MRR" />
        <StatCard label="System Errors" value={errors} sub="last 24 hours" error={errors > 0} />
      </div>

      {/* Charts */}
      <AdminCharts signupData={signupData} templateData={templateData} />
    </div>
  )
}
