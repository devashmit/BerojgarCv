'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FormPanel } from './FormPanel'
import { PreviewPanel } from './PreviewPanel'
import { SectionTabs } from './SectionTabs'
import { useUser } from '@clerk/nextjs'
import { useCVStore } from '@/store/cvStore'
import { Loader2, Download, ChevronDown, Plus } from 'lucide-react'
import { TemplateSwitcherModal } from '../ui/TemplateSwitcherModal'
import { useToast } from '../ui/Toast'
import { UserButton } from '@clerk/nextjs'

// Completeness score based on filled fields
function useCompleteness() {
  const { cvData } = useCVStore()
  const { personal, education, experience, skills, languages } = cvData
  let score = 0
  if (personal.fullName) score += 15
  if (personal.email) score += 10
  if (personal.phone) score += 5
  if (personal.jobTitle) score += 10
  if (personal.summary) score += 10
  if (personal.linkedin) score += 5
  if (education.length > 0) score += 15
  if (experience.length > 0) score += 20
  if (skills.technical.length > 0) score += 5
  if (languages.length > 0) score += 5
  return Math.min(score, 100)
}

function LoadingScreen() {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-gray-50 gap-4">
      <Loader2 size={28} className="animate-spin text-blue-500" />
      <p className="text-sm font-medium text-gray-400">Loading your CV...</p>
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
  const [showSwitcher, setShowSwitcher] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)

  const { setTemplate, isDirty, isSaving, saveToDB, loadFromDB, resetToBlank, cvData, atsScore, setActiveSection } = useCVStore()
  const { user, isLoaded } = useUser()
  const toast = useToast()
  const completeness = useCompleteness()

  const handleDownload = async () => {
    let currentId = cvId
    if (!currentId) {
      await saveToDB()
      currentId = useCVStore.getState().cvId
    }
    if (!currentId) { toast.error('Could not save CV. Please try again.'); return }
    setPdfLoading(true)
    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvId: currentId }),
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cv-${(cvData.personal.fullName || 'download').replace(/\s+/g, '-').toLowerCase()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded!')
    } catch {
      toast.error('PDF generation failed.')
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

  useEffect(() => { if (initialTemplateId) setTemplate(initialTemplateId) }, [initialTemplateId, setTemplate])
  useEffect(() => {
    if (!isDirty || !user) return
    const t = setTimeout(() => saveToDB(), 5000)
    return () => clearTimeout(t)
  }, [isDirty, user, saveToDB])
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (isDirty) { e.preventDefault(); e.returnValue = '' } }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [isDirty])
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isLoaded || isLoadingCV) return <LoadingScreen />

  return (
    <div className="h-[100dvh] w-full flex overflow-hidden bg-gray-100">

      {/* ── Sidebar ── */}
      {!isMobile && (
        <div className="w-[80px] shrink-0 h-full flex flex-col items-center pt-5 pb-5 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-6 shrink-0 shadow-sm">
            <span className="text-white font-black text-sm tracking-tight">CV</span>
          </div>
          <SectionTabs />
          <div className="mt-auto">
            <UserButton />
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Top progress bar ── */}
        <div className="h-11 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-5 gap-4">
          {/* Left: completeness */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap shrink-0">
              Information Completeness —
            </span>
            <div className="flex-1 max-w-[200px] h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completeness}%`,
                  background: completeness >= 80 ? '#22C55E' : completeness >= 50 ? '#F59E0B' : '#3B82F6',
                }}
              />
            </div>
            <span className="text-xs font-bold text-green-600 shrink-0">{completeness}%</span>
          </div>

          {/* Right: Add section shortcut + user */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveSection('experience')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
            >
              <Plus size={13} />
              Add Work Experience
              <span className="text-green-600 font-bold">+20%</span>
              <ChevronDown size={12} className="text-blue-400" />
            </button>
            {isSaving && <span className="text-[10px] text-gray-400 animate-pulse font-medium">saving...</span>}
          </div>
        </div>

        {/* ── Two-panel body ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* Form panel */}
          {(!isMobile || mobileTab === 'edit') && (
            <div className={`${isMobile ? 'w-full' : 'min-w-[360px] max-w-[480px] w-[40%] shrink-0'} h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden`}>
              <FormPanel />
            </div>
          )}

          {/* Preview panel */}
          {(!isMobile || mobileTab === 'preview') && (
            <div className="flex-1 h-full flex flex-col bg-[#161616]">
              {/* Preview toolbar */}
              <div className="h-12 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                <button
                  onClick={() => setShowSwitcher(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <span>Professional 2</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button
                  onClick={handleDownload}
                  disabled={pdfLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {pdfLoading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  {pdfLoading ? 'Generating...' : 'Download Resume'}
                </button>
              </div>

              {/* Resume canvas */}
              <div className="flex-1 overflow-hidden">
                <PreviewPanel isMobile={isMobile} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom tabs */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex bg-white border-t border-gray-200">
          <button onClick={() => setMobileTab('edit')} className={`flex-1 py-3 text-xs font-bold ${mobileTab === 'edit' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-400'}`}>Edit</button>
          <button onClick={() => setMobileTab('preview')} className={`flex-1 py-3 text-xs font-bold ${mobileTab === 'preview' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-400'}`}>Preview</button>
        </div>
      )}

      <TemplateSwitcherModal isOpen={showSwitcher} onClose={() => setShowSwitcher(false)} />
    </div>
  )
}
