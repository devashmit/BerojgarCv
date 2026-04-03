import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function GET() {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(announcements)
}

export async function POST(req: NextRequest) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { message, color, startsAt, endsAt, freeOnly } = await req.json()
  const announcement = await prisma.announcement.create({
    data: { message, color: color || 'info', startsAt: new Date(startsAt), endsAt: new Date(endsAt), freeOnly: freeOnly ?? false },
  })
  return NextResponse.json(announcement)
}
