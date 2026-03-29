import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import BuilderLayout from '@/components/builder/BuilderLayout'

// Mock feature flag read since we don't have LaunchDarkly yet
const getFeatureFlags = () => {
  return { pdfEnabled: true, aiEnabled: true }
}

export default async function BuilderPage(props: { searchParams: Promise<{ template?: string }> }) {
  const { userId } = await auth()
  const searchParams = await props.searchParams
  const templateId = searchParams.template
  
  if (!userId) {
    redirect('/?sign-in=true')
  }

  const flags = getFeatureFlags()

  return <BuilderLayout pdfEnabled={flags.pdfEnabled} initialTemplateId={templateId} />
}
