import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function GET() {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

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

  return NextResponse.json({ subscribers, proCount, teamCount, newThisMonth, mrr })
}
