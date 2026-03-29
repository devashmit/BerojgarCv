import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('photo') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validation
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 413 })
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Please upload an image file.' }, { status: 400 })
    }

    // Convert to base64 dataUri for Cloudinary
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'berojgar-cv/photos', // Changed folder to match project name
      transformation: [
        { width: 400, height: 500, crop: "fill", gravity: "face" }
      ],
      public_id: `user-${userId}-${Date.now()}`,
    })

    return NextResponse.json({ 
      url: result.secure_url, 
      publicId: result.public_id 
    })

  } catch (error) {
    console.error('Photo upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
