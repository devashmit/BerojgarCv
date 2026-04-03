import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function GET(req: NextRequest) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const templateId = searchParams.get('template') || ''
  const success = searchParams.get('success') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 50

  const where: any = {}
  if (templateId) where.templateId = templateId
  if (success === 'true') where.success = true
  if (success === 'false') where.success = false

  const [logs, total, successCount, failCount] = await Promise.all([
    prisma.pDFLog.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.pDFLog.count({ where }),
    prisma.pDFLog.count({ where: { ...where, success: true } }),
    prisma.pDFLog.count({ where: { ...where, success: false } }),
  ])

  const successRate = total > 0 ? Math.round((successCount / total) * 100) : 100

  // Last 7 days chart data
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const chartData = await prisma.$queryRaw<{ date: string; success: boolean; count: bigint }[]>`
    SELECT DATE("createdAt") as date, success, COUNT(*) as count
    FROM "PDFLog"
    WHERE "createdAt" >= ${sevenDaysAgo}
    GROUP BY DATE("createdAt"), success
    ORDER BY date ASC
  `

  return NextResponse.json({
    logs, total, page, pages: Math.ceil(total / limit),
    successRate, successCount, failCount,
    chartData: (chartData as any[]).map((r: any) => ({ date: String(r.date).slice(5), success: r.success, count: Number(r.count) })),
  })
}
