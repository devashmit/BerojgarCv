import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { 
        cvs: {
          orderBy: { updatedAt: 'desc' }
        } 
      }
    })

    if (!user || user.clerkId !== userId) {
      return NextResponse.json([])
    }

    return NextResponse.json(user.cvs)
  } catch (error) {
    console.error('Error fetching CVs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
