import { Metadata } from 'next'
import { TemplatesContent } from '@/components/templates/TemplatesContent'

export const metadata: Metadata = {
  title: 'CV Templates | बेरोजगार CV',
  description: 'Choose from our selection of ATS-optimized and professionally designed CV templates.',
}

export default function TemplatesPage() {
  return <TemplatesContent />
}
