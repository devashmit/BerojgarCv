import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isEnabled } from '@/lib/featureFlags'

export const runtime = 'nodejs'

export async function GET(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  try {
    // Feature flag gate
    if (!(await isEnabled('public_sharing_enabled'))) {
      return NextResponse.json({ error: 'Public sharing is currently disabled.' }, { status: 503 })
    }

    const { shareId } = await params
    const cv = await prisma.cV.findUnique({ where: { shareId } })
    if (!cv) return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    if (!cv.isShared) return NextResponse.json({ error: 'This CV is private' }, { status: 403 })

    return NextResponse.json({ cvData: cv.data, templateId: cv.templateId })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
