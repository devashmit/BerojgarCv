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
  const shared = searchParams.get('shared') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20

  const where: any = {}
  if (templateId) where.templateId = templateId
  if (shared === 'true') where.isShared = true
  if (shared === 'false') where.isShared = false

  const [cvs, total] = await Promise.all([
    prisma.cV.findMany({
      where, skip: (page - 1) * limit, take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.cV.count({ where }),
  ])

  return NextResponse.json({ cvs, total, page, pages: Math.ceil(total / limit) })
}
