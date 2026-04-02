import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'edge'

export async function POST(
  req: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const { userId } = await auth()
    const { reason } = await req.json()

    if (!reason) {
      return NextResponse.json({ error: 'Reason is required' }, { status: 400 })
    }

    await prisma.report.create({
      data: {
        shareId: params.shareId,
        reason,
        reportedBy: userId || null
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reporting CV:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
