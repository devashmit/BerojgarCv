import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function isAdmin(sessionClaims: unknown) {
  return (sessionClaims as Record<string, unknown>)?.isAdmin === true ||
    ((sessionClaims as Record<string, unknown>)?.metadata as Record<string, unknown>)?.isAdmin === true
}

export async function GET() {
  const { userId, sessionClaims } = await auth()
  if (!userId || !isAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart); weekStart.setDate(weekStart.getDate() - 7)
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    totalUsers, usersToday, usersThisWeek,
    totalCVs, cvsToday,
    pdfToday,
    activeSubs,
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
    prisma.user.count({ where: { plan: { in: ['PRO', 'TEAM'] } } }),
    prisma.auditLog.count({ where: { action: { startsWith: 'error.' }, createdAt: { gte: last24h } } }),
    prisma.user.count({ where: { plan: 'PRO' } }),
    prisma.user.count({ where: { plan: 'TEAM' } }),
    // Signups last 30 days grouped by day
    prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "User"
      WHERE "createdAt" >= ${new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
    // Template popularity
    prisma.$queryRaw<{ templateId: string; count: bigint }[]>`
      SELECT "templateId", COUNT(*) as count
      FROM "CV"
      GROUP BY "templateId"
      ORDER BY count DESC
    `,
  ])

  return NextResponse.json({
    totalUsers, usersToday, usersThisWeek,
    totalCVs, cvsToday,
    pdfToday,
    activeSubs,
    errors,
    mrr: proCount * 299 + teamCount * 999,
    signupsByDay: (signupsByDay as any[]).map((r: any) => ({ date: r.date, count: Number(r.count) })),
    templateStats: (templateStats as any[]).map((r: any) => ({ templateId: r.templateId, count: Number(r.count) })),
  })
}
