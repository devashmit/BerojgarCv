import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const cv = await prisma.cV.findUnique({
      where: { shareId: params.shareId }
    })

    if (!cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    if (!cv.isShared) {
      return NextResponse.json({ error: 'This CV is private' }, { status: 403 })
    }

    return NextResponse.json({ 
      cvData: cv.data, 
      templateId: cv.templateId 
    })
  } catch (error) {
    console.error('Error fetching shared CV:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
