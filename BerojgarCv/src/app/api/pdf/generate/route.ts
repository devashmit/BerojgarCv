import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { getPDFComponent } from '@/components/cv-pdf'
import { prisma } from '@/lib/prisma'
import React from 'react'

// PDF generation must run in Node.js environment
// Vercel Edge has a strict 25s execution limit and lacks many native Node bindings needed by @react-pdf/renderer
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { cvId } = body

    if (!cvId) {
      return NextResponse.json({ error: 'cvId is required' }, { status: 400 })
    }

    // 1. Fetch CV and verify ownership
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
      include: { user: true }
    })

    if (!cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    if (cv.user.clerkId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const cvData = cv.data as any
    const templateId = cv.templateId

    // 2. Start timer
    const start = Date.now()

    // 3. Get corresponding PDF template component
    const PDFComponent = getPDFComponent(templateId)

    // 4. Render to buffer
    const element = React.createElement(PDFComponent, { cvData: cvData })
    // @ts-ignore
    const buffer = await renderToBuffer(element)
    const durationMs = Date.now() - start

    // 5. Log to PDFLog model
    await prisma.pDFLog.create({
      data: { userId, templateId, success: true, durationMs }
    })

    // 6. Return binary response
    const name = (cvData.personal.fullName || 'download').replace(/\s+/g, '-').toLowerCase()
    
    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="cv-${name}.pdf"`,
      },
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    
    // Log failure
    const sesh = await auth()
    await prisma.pDFLog.create({
      data: { userId: sesh.userId || 'anonymous', templateId: 'unknown', success: false, errorMsg: error instanceof Error ? error.message : 'Unknown' }
    })

    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
