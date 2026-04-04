import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { CVData } from '@/types/cv'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { cvData, templateId, title, cvId } = body as { 
      cvData: CVData; 
      templateId: string; 
      title: string; 
      cvId?: string 
    }

    // 1. Upsert User in DB
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      create: { 
        clerkId: userId, 
        email: cvData.personal.email || "" 
      },
      update: {},
    })

    let cv;

    // 2. Insert or Update CV
    if (cvId) {
      // Verify ownership
      const existing = await prisma.cV.findUnique({
        where: { id: cvId }
      })

      if (!existing) {
        return NextResponse.json({ error: 'CV not found' }, { status: 404 })
      }

      if (existing.userId !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      cv = await prisma.cV.update({
        where: { id: cvId },
        data: {
          data: cvData as any,
          templateId,
          title
        }
      })
    } else {
      cv = await prisma.cV.create({
        data: {
          userId: user.id,
          data: cvData as any,
          templateId,
          title
        }
      })

      // AuditLog — non-blocking
      prisma.auditLog.create({
        data: { userId, action: 'cv.create', metadata: { cvId: cv.id, templateId } },
      }).catch(() => {})
    }

    return NextResponse.json({ 
      cvId: cv.id, 
      shareId: cv.shareId 
    })
  } catch (error) {
    console.error('Error saving CV:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
