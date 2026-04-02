import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import BuilderLayout from '@/components/builder/BuilderLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CV Builder | बेरोजगार CV',
  description: 'Create a professional CV in minutes with our easy-to-use builder.',
}

// Mock feature flag read since we don't have LaunchDarkly yet
const getFeatureFlags = () => {
  return { pdfEnabled: true, aiEnabled: true }
}

export default async function BuilderPage(props: { searchParams: Promise<{ template?: string; cv?: string }> }) {
  const { userId } = await auth()
  const searchParams = await props.searchParams
  const templateId = searchParams.template
  const cvId = searchParams.cv
  
  if (!userId) {
    redirect('/?sign-in=true')
  }

  const flags = getFeatureFlags()

  return <BuilderLayout pdfEnabled={flags.pdfEnabled} initialTemplateId={templateId} cvId={cvId} />
}
