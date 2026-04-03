import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function checkAdmin(sessionClaims: unknown) {
  return (sessionClaims as any)?.metadata?.isAdmin === true
}

export async function GET(req: NextRequest) {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const plan = searchParams.get('plan') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20

  const where: any = {}
  if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }]
  if (plan && plan !== 'ALL') where.plan = plan

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where, skip: (page - 1) * limit, take: limit,
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { cvs: true } } },
    }),
    prisma.user.count({ where }),
  ])

  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) })
}
