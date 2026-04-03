import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// Public endpoint — returns currently active announcements
export async function GET() {
  try {
    const now = new Date()
    const announcements = await prisma.announcement.findMany({
      where: {
        startsAt: { lte: now },
        endsAt: { gte: now },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(announcements)
  } catch {
    return NextResponse.json([])
  }
}
