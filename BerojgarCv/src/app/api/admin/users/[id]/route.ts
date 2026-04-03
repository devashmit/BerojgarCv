import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bustFlagsCache } from '@/lib/featureFlags'

export const runtime = 'nodejs'

function checkAdmin(sessionClaims: unknown) {
  return (sessionClaims as any)?.metadata?.isAdmin === true
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const [user, logs, cvs] = await Promise.all([
    prisma.user.findUnique({ where: { id } }),
    prisma.auditLog.findMany({ where: { userId: id }, orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.cV.findMany({ where: { userId: id }, orderBy: { updatedAt: 'desc' } }),
  ])

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ user, logs, cvs })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await req.json()
  const { plan, planExpiresAt, suspended } = body

  const data: any = {}
  if (plan) data.plan = plan
  if (planExpiresAt) data.planExpiresAt = new Date(planExpiresAt)
  if (typeof suspended === 'boolean') data.isAdmin = !suspended // repurpose isAdmin as suspended flag for now

  const user = await prisma.user.update({ where: { id }, data })

  // Audit log — non-blocking
  prisma.auditLog.create({
    data: {
      userId,
      action: plan ? 'admin.plan_change' : 'admin.user_suspend',
      metadata: plan ? { targetUserId: id, newPlan: plan, expiresAt: planExpiresAt } : { targetUserId: id },
    },
  }).catch(() => {})

  return NextResponse.json(user)
}
