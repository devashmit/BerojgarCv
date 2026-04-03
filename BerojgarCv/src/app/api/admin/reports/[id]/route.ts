import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const { action } = await req.json()

  if (action === 'resolve' || action === 'dismiss') {
    await prisma.report.update({ where: { id }, data: { resolved: true } })
  }

  return NextResponse.json({ ok: true })
}
