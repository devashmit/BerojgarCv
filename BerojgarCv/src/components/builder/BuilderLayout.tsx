'use client'

import React, { useState, useEffect } from 'react'
import { BuilderToolbar } from './BuilderToolbar'
import { FormPanel } from './FormPanel'
import { PreviewPanel } from './PreviewPanel'

import { useUser } from '@clerk/nextjs'
import { useCVStore } from '@/store/cvStore'

export default function BuilderLayout({ 
  pdfEnabled, 
  initialTemplateId,
  cvId
}: { 
  pdfEnabled: boolean,
  initialTemplateId?: string,
  cvId?: string
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
  const { setTemplate, isDirty, saveToDB, loadFromDB } = useCVStore()
  const { isSignedIn } = useUser()

  // Load CV from DB if cvId is provided
  useEffect(() => {
    if (cvId) {
      loadFromDB(cvId)
    }
  }, [cvId, loadFromDB])

  // Set template on load
  useEffect(() => {
    if (initialTemplateId) {
      setTemplate(initialTemplateId)
    }
  }, [initialTemplateId, setTemplate])

  // Auto-save: 5 seconds after last edit, only if signed in
  useEffect(() => {
    if (!isDirty || !isSignedIn) return
    const timer = setTimeout(() => {
      saveToDB()
    }, 5000)
    return () => clearTimeout(timer)
  }, [isDirty, isSignedIn, saveToDB])

  // Warn on close if unsaved changes exist
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-gray-50">
      <BuilderToolbar />
      
      {isMobile && (
        <div className="flex bg-white border-b border-gray-200 shrink-0">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mobileTab === 'edit'
                ? 'bg-[var(--dhaka-crimson)] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Edit Resume
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mobileTab === 'preview'
                ? 'bg-[var(--dhaka-crimson)] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Live Preview
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {(!isMobile || mobileTab === 'edit') && (
          <div className={`${isMobile ? 'w-full' : 'w-[380px] shrink-0 border-r border-[#E2E8F0]'} h-full flex flex-col overflow-hidden bg-white z-10`}>
             <FormPanel />
          </div>
        )}

        {(!isMobile || mobileTab === 'preview') && (
          <div className={`${isMobile ? 'inset-0 absolute' : 'flex-1'} h-full overflow-y-auto bg-[#161616]`}>
            <PreviewPanel isMobile={isMobile} />
          </div>
        )}
      </div>
    </div>
  )
}
