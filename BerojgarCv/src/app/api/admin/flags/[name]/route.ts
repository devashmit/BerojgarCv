import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bustFlagsCache } from '@/lib/featureFlags'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { name } = await params
  const { enabled } = await req.json()

  const flag = await prisma.featureFlag.update({
    where: { id: name },
    data: { enabled },
  })

  bustFlagsCache()

  // Audit log — non-blocking
  prisma.auditLog.create({
    data: { userId, action: 'admin.flag_toggle', metadata: { flagId: name, enabled } },
  }).catch(() => {})

  return NextResponse.json(flag)
}
