import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const cv = await prisma.cV.update({ where: { id }, data: { isShared: false } })

  prisma.auditLog.create({
    data: { userId, action: 'admin.cv_revoke', metadata: { cvId: id, shareId: cv.shareId } },
  }).catch(() => {})

  return NextResponse.json({ ok: true })
}
