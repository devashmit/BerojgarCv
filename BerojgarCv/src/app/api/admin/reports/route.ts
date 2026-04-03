import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function GET(req: NextRequest) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const showResolved = new URL(req.url).searchParams.get('resolved') === 'true'
  const reports = await prisma.report.findMany({
    where: showResolved ? {} : { resolved: false },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(reports)
}
