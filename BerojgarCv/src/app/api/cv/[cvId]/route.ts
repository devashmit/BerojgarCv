import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: NextRequest, { params }: { params: Promise<{ cvId: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { cvId } = await params
    const cv = await prisma.cV.findUnique({ where: { id: cvId }, include: { user: true } })
    if (!cv) return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    if (cv.user.clerkId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json({ cvData: cv.data, templateId: cv.templateId, shareId: cv.shareId, title: cv.title })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ cvId: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { cvId } = await params
    const cv = await prisma.cV.findUnique({ where: { id: cvId }, include: { user: true } })
    if (!cv) return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    if (cv.user.clerkId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    await prisma.cV.delete({ where: { id: cvId } })

    // AuditLog — non-blocking
    prisma.auditLog.create({ data: { userId, action: 'cv.delete', metadata: { cvId } } }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ cvId: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { cvId } = await params
    const { title } = await req.json()
    const cv = await prisma.cV.findUnique({ where: { id: cvId }, include: { user: true } })
    if (!cv) return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    if (cv.user.clerkId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const updated = await prisma.cV.update({ where: { id: cvId }, data: { title } })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
