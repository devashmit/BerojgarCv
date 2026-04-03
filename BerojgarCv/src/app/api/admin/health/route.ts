import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { T3PDF } from '@/components/cv-pdf/T3PDF'
import { defaultCVData } from '@/lib/defaultCVData'

export const runtime = 'nodejs'

function checkAdmin(s: unknown) { return (s as any)?.metadata?.isAdmin === true }

export async function GET() {
  const { userId, sessionClaims } = await auth()
  if (!userId || !checkAdmin(sessionClaims)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const results = await Promise.allSettled([
    // DB check
    (async () => {
      const start = Date.now()
      await prisma.$queryRaw`SELECT 1`
      return { ok: true, ms: Date.now() - start }
    })(),
    // PDF check
    (async () => {
      const start = Date.now()
      const el = React.createElement(T3PDF, { cvData: defaultCVData })
      // @ts-ignore
      await renderToBuffer(el)
      return { ok: true, ms: Date.now() - start }
    })(),
  ])

  const dbResult = results[0]
  const pdfResult = results[1]

  const errors = await prisma.auditLog.findMany({
    where: { action: { startsWith: 'error.' } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json({
    db: dbResult.status === 'fulfilled' ? { ok: true, ms: (dbResult.value as any).ms } : { ok: false, error: String((dbResult as any).reason) },
    pdf: pdfResult.status === 'fulfilled' ? { ok: true, ms: (pdfResult.value as any).ms } : { ok: false, error: String((pdfResult as any).reason) },
    clerk: { ok: true }, // Clerk is healthy if we got here (auth passed)
    cloudinary: { ok: !!process.env.CLOUDINARY_API_KEY },
    errors,
  })
}
