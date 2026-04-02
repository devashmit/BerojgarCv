'use client'

import React, { useState } from 'react'
import { getTemplateComponent } from '../cv-templates'
import { DhakaLogo, DhakaBorder } from '../dhaka'
import Link from 'next/link'
import { AlertCircle, ChevronRight, Share2 } from 'lucide-react'
import { ReportDialog } from '../ui/ReportDialog'
import { useToast } from '../ui/Toast'

interface PublicPreviewProps {
  cvData: any
  templateId: string
  shareId: string
}

export function PublicPreview({ cvData, templateId, shareId }: PublicPreviewProps) {
  const [showReport, setShowReport] = useState(false)
  const Template = getTemplateComponent(templateId)
  const toast = useToast()

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${cvData.personal.fullName} - Professional CV`,
        url: window.location.href
      })
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      toast.info('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Minimal Nav */}
      <nav className="h-[64px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <DhakaLogo size={24} />
        <Link
          href="/builder"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--dhaka-crimson)] text-white text-sm font-bold rounded-xl hover:bg-[var(--dhaka-crimson-hover)] transition-all shadow-md shadow-red-900/10"
        >
          Build Your Own CV
          <ChevronRight size={16} />
        </Link>
      </nav>

      <DhakaBorder height={6} />

      <main className="flex-1 py-12 px-4 md:px-8 flex flex-col items-center">
        {/* CV Paper */}
        <div className="w-full max-w-[210mm] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden mb-12">
          <Template cvData={cvData} />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 mb-20">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Share2 size={18} />
            Share Profile
          </button>
          <button 
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-gray-400 hover:text-red-500 transition-all"
          >
            <AlertCircle size={18} />
            Report Content
          </button>
        </div>

        {/* Brand Callout Strip */}
        <div className="w-full max-w-4xl flex flex-col items-center">
           <DhakaBorder height={4} className="w-full opacity-30 mb-8" />
           <div className="flex flex-col md:flex-row items-center gap-4 text-center">
             <span className="text-gray-400 font-medium italic">Built with</span>
             <DhakaLogo size={20} />
             <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-200" />
             <p className="text-gray-500 font-medium">Join 50k+ professionals and build your verified CV for free.</p>
           </div>
        </div>
      </main>

      <ReportDialog 
        shareId={shareId} 
        isOpen={showReport} 
        onClose={() => setShowReport(false)} 
      />
    </div>
  )
}
