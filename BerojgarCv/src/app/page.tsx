import { Metadata } from 'next'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { LiveBuilderDemo } from '@/components/landing/LiveBuilderDemo'
import { TemplatesSection } from '@/components/landing/TemplatesSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'
import { DhakaBorder } from '@/components/dhaka'

export const metadata: Metadata = {
  title: "बेरोजगार CV — Nepal's #1 CV Builder",
  description: "Build a professional CV in 10 minutes with ATS-friendly templates and AI improvement.",
  keywords: ["बेरोजगार CV", "berojgar cv", "nepal cv builder", "nepali resume builder", "rirekisho builder"],
}

export default function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <LiveBuilderDemo />
      <TemplatesSection />
      <DhakaBorder height={10} />
      <FeaturesSection />
      <DhakaBorder height={8} />
      <HowItWorks />
      <DhakaBorder height={10} />
      <CTASection />
      <Footer />
    </main>
  )
}
