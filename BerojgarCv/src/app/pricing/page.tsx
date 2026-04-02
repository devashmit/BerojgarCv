'use client'

import React, { useState } from 'react'
import { PricingToggle } from '@/components/ui/PricingToggle'
import { DhakaTexture, DhakaLogo, DhakaBorder } from '@/components/dhaka'
import { Check, ChevronDown, Sparkles, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for local job seekers starting their career.',
    features: [
      '3 CV completions',
      'Basic templates (T3, T4)',
      'PDF Download (standard)',
      'Public sharing link',
      'ATS score analysis'
    ],
    cta: 'Get Started',
    href: '/sign-up',
    highlighted: false
  },
  {
    name: 'Pro',
    price: 299,
    annualPrice: 2499,
    description: 'For global job seekers aiming for high-tier roles.',
    features: [
      'Unlimited CVs',
      'All Premium Templates (T1-T7)',
      'AI Bullet Improvement (Unlimited)',
      'Priority PDF processing',
      'Japan Rirekisho Support',
      'No Berojgar branding on PDF'
    ],
    cta: 'Upgrade to Pro',
    href: '#',
    highlighted: true
  },
  {
    name: 'Team',
    price: 999,
    description: 'For recruitment agencies and hiring teams.',
    features: [
      'Up to 10 users',
      'Shared templates',
      'Centralized dashboard',
      'Custom branding',
      'API access'
    ],
    cta: 'Contact Sales',
    href: '#',
    highlighted: false
  }
]

const FAQS = [
  {
    question: 'Is it really free for Nepali students?',
    answer: 'Yes! Our Free plan is designed to help local students and job seekers enter the market. You can create up to 3 CVs with standard templates and download them as many times as you need.'
  },
  {
    question: 'How does the AI Bullet Improvement work?',
    answer: 'Our Pro plan includes integration with Claude 3.5 Sonnet. When you write a bullet point, you can click "AI Improve" and our system will rewrite it to be more professional, action-oriented, and ATS-friendly.'
  },
  {
    question: 'Do I need a credit card to sign up?',
    answer: 'No credit card is required for the Free plan. You only need to provide payment details if you decide to upgrade to Pro or Team.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription from your account settings at any time. You will continue to have access to Pro features until the end of your billing period.'
  },
  {
    question: 'What is the Japan Rirekisho template?',
    answer: 'T7 is a specialized JIS-standard template for Japanese job applications. It includes specific fields for Furigana, JLPT levels, and Visa types that are required for hiring in Japan.'
  }
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const toast = useToast()

  const handleProClick = () => {
    toast.info('Pro subscriptions are coming soon! Stay tuned.')
  }

  return (
    <div className="min-h-screen bg-[var(--ground-deep)] overflow-hidden relative">
      <DhakaTexture opacity={0.03} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <DhakaLogo size={28} />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
            <span className="text-amber-500 font-tiro uppercase tracking-[0.3em] text-xs">Pricing Tiers</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-fraunces font-black text-white mb-6 leading-tight">
             Premium Plans for <em className="text-[var(--dhaka-amber)] font-tiro not-italic">Global</em> Careers
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Build your professional future with tools that matter. Choose a plan that fits your ambition.
          </p>

          <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 w-full">
           {PLANS.map((plan, idx) => (
             <motion.div
               key={plan.name}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className={`relative bg-white/5 backdrop-blur-md rounded-[32px] p-8 border transition-all ${
                 plan.highlighted 
                  ? 'border-[var(--dhaka-crimson)] shadow-[0_0_40px_rgba(192,57,43,0.15)] ring-1 ring-[var(--dhaka-crimson)]/50 scale-105 z-20' 
                  : 'border-white/10 hover:border-white/20'
               }`}
             >
               {plan.highlighted && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--dhaka-crimson)] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                   Recommended
                 </div>
               )}

               <div className="mb-8">
                 <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                 <p className="text-gray-500 text-sm">{plan.description}</p>
               </div>

               <div className="mb-8 flex items-baseline gap-2">
                 <span className="text-4xl font-black text-white font-fraunces">
                   NPR {isAnnual && plan.annualPrice ? plan.annualPrice : plan.price}
                 </span>
                 <span className="text-gray-500 text-sm font-medium">
                   /{isAnnual ? 'year' : 'month'}
                 </span>
               </div>

               <div className="space-y-4 mb-10">
                 {plan.features.map(feat => (
                   <div key={feat} className="flex items-start gap-3">
                     <div className="p-0.5 bg-green-500/20 rounded-full mt-1">
                        <Check size={12} className="text-green-400" />
                     </div>
                     <span className="text-gray-400 text-sm font-medium leading-tight">{feat}</span>
                   </div>
                 ))}
               </div>

               {plan.name === 'Free' ? (
                 <Link
                   href={plan.href}
                   className="block w-full py-4 text-center bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10"
                 >
                   {plan.cta}
                 </Link>
               ) : (
                 <button
                   onClick={handleProClick}
                   className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl ${
                     plan.highlighted
                       ? 'bg-[var(--dhaka-crimson)] text-white hover:bg-[var(--dhaka-crimson-hover)] shadow-red-900/20'
                       : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                   }`}
                 >
                   {plan.cta}
                 </button>
               )}
             </motion.div>
           ))}
        </div>

        {/* FAQ Section */}
        <section className="w-full max-w-3xl mb-32">
          <div className="flex flex-col items-center mb-12">
            <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 mb-4">
              <HelpCircle size={28} />
            </div>
            <h2 className="text-3xl font-bold font-fraunces text-white">Common Questions</h2>
          </div>

          <div className="space-y-4">
             {FAQS.map((faq, idx) => (
               <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                 <button
                   onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                   className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                 >
                   <span className="font-bold text-white pr-4">{faq.question}</span>
                   <ChevronDown 
                     size={20} 
                     className={`text-gray-500 transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`} 
                   />
                 </button>
                 <AnimatePresence>
                   {openFAQ === idx && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="px-6 pb-5"
                     >
                       <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                         {faq.answer}
                       </p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="w-full max-w-4xl relative rounded-[48px] overflow-hidden bg-gradient-to-br from-[var(--dhaka-crimson)] to-[#8E1C12] p-12 md:p-20 text-center">
           <DhakaTexture opacity={0.1} />
           <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-black font-fraunces text-white mb-6 leading-tight">
                Ready to Land Your <br className="hidden md:block" /> Dream Job?
              </h2>
              <p className="text-white/70 max-w-lg mb-10 font-medium">
                Thousands of professionals have already upgraded their career with बेरोजगार CV. Join them today.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/builder"
                  className="px-10 py-4 bg-[var(--dhaka-amber)] text-gray-900 rounded-2xl font-black transition-all hover:scale-105 shadow-2xl"
                >
                  Create For Free
                </Link>
                <button
                   onClick={handleProClick}
                   className="px-10 py-4 bg-white text-[var(--dhaka-crimson)] rounded-2xl font-bold transition-all hover:bg-gray-100 shadow-xl"
                >
                  View Pro Demo
                </button>
              </div>
           </div>
        </section>

        <DhakaBorder height={6} className="w-full mt-32" />
      </main>
    </div>
  )
}
