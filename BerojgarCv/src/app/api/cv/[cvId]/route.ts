import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
  { params }: { params: { cvId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cv = await prisma.cV.findUnique({
      where: { id: params.cvId },
      include: { user: true }
    })

    if (!cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    // Verify ownership via user.clerkId
    if (cv.user.clerkId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ 
      cvData: cv.data, 
      templateId: cv.templateId, 
      shareId: cv.shareId, 
      title: cv.title 
    })
  } catch (error) {
    console.error('Error fetching CV:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { cvId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cv = await prisma.cV.findUnique({
      where: { id: params.cvId },
      include: { user: true }
    })

    if (!cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    if (cv.user.clerkId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.cV.delete({
      where: { id: params.cvId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting CV:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { cvId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title } = body

    const cv = await prisma.cV.findUnique({
      where: { id: params.cvId },
      include: { user: true }
    })

    if (!cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    if (cv.user.clerkId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.cV.update({
      where: { id: params.cvId },
      data: { title }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating CV:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

