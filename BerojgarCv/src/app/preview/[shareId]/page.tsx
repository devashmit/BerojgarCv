import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PublicPreview } from '@/components/preview/PublicPreview'
import { Metadata } from 'next'

interface PreviewPageProps {
  params: Promise<{ shareId: string }>
}

export async function generateMetadata(props: PreviewPageProps): Promise<Metadata> {
  const params = await props.params
  const cv = await prisma.cV.findUnique({
    where: { shareId: params.shareId },
    include: { user: true }
  })

  if (!cv || !cv.isShared) {
    return { title: 'CV Not Found | बेरोजगार CV' }
  }

  const cvData = cv.data as any
  const fullName = cvData.personal?.fullName || 'Professional'

  return {
    title: `${fullName} — Professional CV | बेरोजगार CV`,
    description: `View ${fullName}'s professional CV built with Nepal's #1 CV builder.`,
    openGraph: {
      title: `${fullName} — Professional CV`,
      description: `Built on बेरोजगार CV`,
      images: [
        {
          url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1200,h_630,c_fill/berojgar-cv/og-template.jpg`,
          width: 1200,
          height: 630,
          alt: `${fullName} CV`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fullName} — Professional CV`,
      description: 'View this professional CV on बेरोजगार CV',
    }
  }
}

export default async function PreviewPage(props: PreviewPageProps) {
  const params = await props.params
  const cv = await prisma.cV.findUnique({
    where: { shareId: params.shareId }
  })

  if (!cv || !cv.isShared) {
    notFound()
  }

  return (
    <PublicPreview 
      cvData={cv.data} 
      templateId={cv.templateId} 
      shareId={params.shareId} 
    />
  )
}
