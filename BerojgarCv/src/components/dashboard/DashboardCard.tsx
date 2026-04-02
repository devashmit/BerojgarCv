'use client'

import React, { useState, useEffect, useRef } from 'react'
import { THUMB_MAP } from '../cv-templates'
import { ATSBadge } from '../ui/ATSBadge'
import { PencilLine, Link2, Download, Trash2, Check, X, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useToast } from '../ui/Toast'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { calculateATS } from '@/lib/atsCalculator'

interface DashboardCardProps {
  cv: any
  onDelete: (id: string) => void
  onUpdateTitle: (id: string, newTitle: string) => void
}

export function DashboardCard({ cv, onDelete, onUpdateTitle }: DashboardCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(cv.title)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const Thumb = THUMB_MAP[cv.templateId] || THUMB_MAP.t3
  const atsScore = calculateATS(cv.data, cv.templateId)

  useEffect(() => {
    if (isEditingTitle) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditingTitle])

  const handleSaveTitle = async () => {
    if (tempTitle.trim() === '') {
      setTempTitle(cv.title)
      setIsEditingTitle(false)
      return
    }
    if (tempTitle === cv.title) {
      setIsEditingTitle(false)
      return
    }
    onUpdateTitle(cv.id, tempTitle)
    setIsEditingTitle(false)
  }

  const handleCancelTitle = () => {
    setTempTitle(cv.title)
    setIsEditingTitle(false)
  }

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/preview/${cv.shareId}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    } catch {
      toast.error('Failed to copy link.')
    }
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvId: cv.id }),
      })
      if (!res.ok) throw new Error()
      
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `berojgar-cv-${cv.title.replace(/\s+/g, '-').toLowerCase()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded.')
    } catch {
      toast.error('Download failed.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group flex flex-col overflow-hidden h-full">
      {/* Thumbnail Area */}
      <div className="h-[140px] bg-white border-b border-gray-50 overflow-hidden relative group-hover:bg-gray-50/50 transition-colors">
        <div className="absolute inset-0 scale-[0.6] origin-top p-2">
           <Thumb />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        
        {/* ATS Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
           <ATSBadge score={atsScore} />
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title Row */}
        <div className="flex items-center justify-between gap-2 mb-1 min-h-[28px]">
          {isEditingTitle ? (
            <div className="flex-1 flex items-center gap-1">
              <input
                ref={inputRef}
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle()
                  if (e.key === 'Escape') handleCancelTitle()
                }}
                onBlur={handleSaveTitle}
                className="w-full px-1 py-0.5 border-b-2 border-[var(--dhaka-amber)] outline-none text-sm font-bold text-gray-900 bg-amber-50/30"
              />
            </div>
          ) : (
            <h3 
              onClick={() => setIsEditingTitle(true)}
              className="text-sm font-bold text-gray-900 truncate flex-1 cursor-text hover:text-[var(--dhaka-crimson)] transition-colors"
            >
              {cv.title} 
            </h3>
          )}
          <ATSBadge score={atsScore} className="group-hover:hidden" />
        </div>

        {/* Date Row */}
        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono mb-4">
          Modified {formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true })}
        </div>

        {/* Actions Row */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-50 pt-3">
          <div className="flex items-center gap-1">
            <Link
              href={`/builder?cv=${cv.id}`}
              className="p-2 text-gray-400 hover:text-[var(--dhaka-crimson)] hover:bg-red-50 rounded-lg transition-all"
              title="Edit CV"
            >
              <PencilLine size={18} />
            </Link>
            <button
              onClick={handleCopyLink}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Copy Share Link"
            >
              <Link2 size={18} />
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
              title="Download PDF"
            >
              {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            </button>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Delete CV"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => onDelete(cv.id)}
        title="Delete this CV?"
        message="This action cannot be undone. All your progress for this CV will be permanently lost."
        confirmLabel="Delete"
        dangerMode={true}
      />
    </div>
  )
}
