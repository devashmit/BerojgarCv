'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FormPanel } from './FormPanel'
import { PreviewPanel } from './PreviewPanel'
import { SectionTabs } from './SectionTabs'
import { useUser } from '@clerk/nextjs'
import { useCVStore } from '@/store/cvStore'
import { Loader2 } from 'lucide-react'
import { TemplateSwitcherModal } from '../ui/TemplateSwitcherModal'
import { useToast } from '../ui/Toast'

function LoadingScreen() {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-[#F0F4FC] gap-4">
      <Loader2 size={36} className="animate-spin text-blue-600" />
      <p className="text-sm font-semibold tracking-widest uppercase text-slate-500">
        Loading your Profile...
      </p>
    </div>
  )
}

export default function BuilderLayout({
  pdfEnabled,
  initialTemplateId,
  cvId,
}: {
  pdfEnabled: boolean
  initialTemplateId?: string
  cvId?: string
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
  const [isLoadingCV, setIsLoadingCV] = useState(!!cvId)

  const { setTemplate, isDirty, saveToDB, loadFromDB, resetToBlank, cvData } = useCVStore()
  const { user, isLoaded } = useUser()

  const [showSwitcher, setShowSwitcher] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const toast = useToast()

  const handleDownload = async () => {
    let currentId = cvId
    if (!currentId) {
      toast.info('Saving your CV before download...')
      await saveToDB()
      currentId = useCVStore.getState().cvId ?? undefined
    }
    if (!currentId) { toast.error('Could not save CV. Please try again.'); return }

    setPdfLoading(true)
    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvId: currentId }),
      })
      if (!res.ok) throw new Error(await res.text())
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `berojgar-cv-${(cvData.personal.fullName || 'download').replace(/\s+/g, '-').toLowerCase()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded successfully.')
    } catch {
      toast.error('PDF generation failed. Please try again.')
    } finally {
      setPdfLoading(false)
    }
  }

  const prevUserIdRef = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    if (!isLoaded) return
    const currentUserId = user?.id ?? null
    const prevUserId = prevUserIdRef.current
    const isFirstRender = prevUserId === undefined
    const userChanged = !isFirstRender && prevUserId !== currentUserId
    prevUserIdRef.current = currentUserId

    if (isFirstRender || userChanged) {
      resetToBlank(currentUserId)
      if (cvId && currentUserId) {
        setIsLoadingCV(true)
        loadFromDB(cvId, currentUserId).finally(() => setIsLoadingCV(false))
      }
    }
  }, [isLoaded, user?.id, cvId, resetToBlank, loadFromDB])

  useEffect(() => {
    if (initialTemplateId) setTemplate(initialTemplateId)
  }, [initialTemplateId, setTemplate])

  useEffect(() => {
    if (!isDirty || !user) return
    const timer = setTimeout(() => { saveToDB() }, 5000)
    return () => clearTimeout(timer)
  }, [isDirty, user, saveToDB])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isLoaded || isLoadingCV) {
    return <LoadingScreen />
  }

  // Brand new 3-column layout mimicking the pristine React UI
  return (
    <div className="h-[100dvh] w-full flex flex-col lg:flex-row overflow-hidden bg-white">
      
      {/* 1. Left Vertical Nav */}
      {!isMobile && (
        <div className="w-[88px] shrink-0 border-r border-slate-100 h-full flex flex-col bg-white py-4 items-center gap-1">
          {/* Logo */}
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-4 shadow-sm shrink-0">
            <span className="text-white font-bold text-base">CV</span>
          </div>
          <SectionTabs />
        </div>
      )}

      {/* Mobile Toggle Bar */}
      {isMobile && (
        <div className="flex bg-white shadow-sm shrink-0 z-50">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-4 text-sm font-bold ${mobileTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
          >
            Edit
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-4 text-sm font-bold ${mobileTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
          >
            Preview
          </button>
        </div>
      )}

      {/* 2 & 3. Main Split (Form & Preview) */}
      <div className="flex-1 flex w-full h-full relative">
        
        {/* FORM PANEL (Column 2) */}
        {(!isMobile || mobileTab === 'edit') && (
          <div className={`${isMobile ? 'w-full' : 'max-w-[700px] flex-1'} h-full flex flex-col overflow-y-auto bg-white`}>
            <FormPanel />
          </div>
        )}

        {/* PREVIEW PANEL (Column 3) */}
        {(!isMobile || mobileTab === 'preview') && (
          <div className={`${isMobile ? 'inset-0 absolute' : 'flex-1'} h-full flex flex-col bg-[#F0F4FC]`}>
            {/* Embedded Toolbar into Preview Panel */}
            <div className="h-[73px] shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-6">
              {/* Progress Bar Area */}
              <div className="flex flex-col gap-1 w-full max-w-[300px]">
                 <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                   <span className="text-slate-400">Completeness</span>
                   <span className="text-green-500">73%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] w-[73%] rounded-full" />
                 </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => setShowSwitcher(true)}
                   className="h-9 px-4 rounded-md border border-slate-200 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors hidden xl:block"
                 >
                   Templates
                 </button>
                 <button 
                   onClick={handleDownload}
                   disabled={pdfLoading}
                   className="h-9 px-6 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                 >
                   {pdfLoading ? 'Generating...' : 'Download Resume'} <span className="text-lg">↓</span>
                 </button>
              </div>
            </div>

             {/* Resume Canvas Area */}
             <div className="flex-1 overflow-y-auto w-full">
                <PreviewPanel isMobile={isMobile} />
             </div>
           </div>
         )}
       </div>

      <TemplateSwitcherModal isOpen={showSwitcher} onClose={() => setShowSwitcher(false)} />
    </div>
  )
}
