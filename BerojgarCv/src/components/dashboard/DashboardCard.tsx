'use client'

import React, { useState, useEffect, useRef } from 'react'
import { THUMB_MAP } from '../cv-templates'
import { ATSBadge } from '../ui/ATSBadge'
import { PencilLine, Link2, Download, Trash2, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useToast } from '../ui/Toast'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { calculateATS } from '@/lib/atsCalculator'

const TEMPLATE_LABELS: Record<string, string> = {
  t1: 'Dhaka Heritage', t2: 'Himalaya Modern', t3: "Jake's Resume",
  t4: 'Zurich Executive', t5: 'Nova Sidebar', t6: 'Paris Elegante', t7: 'Rirekisho',
}

interface DashboardCardProps {
  cv: any
  onDelete: (id: string) => void
  onUpdateTitle: (id: string, newTitle: string) => void
}

export function DashboardCard({ cv, onDelete, onUpdateTitle }: DashboardCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(cv.title)
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
    if (!tempTitle.trim()) { setTempTitle(cv.title); setIsEditingTitle(false); return }
    if (tempTitle === cv.title) { setIsEditingTitle(false); return }
    onUpdateTitle(cv.id, tempTitle)
    setIsEditingTitle(false)
  }

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/preview/${cv.shareId}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Share link copied.')
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
      a.download = `cv-${cv.title.replace(/\s+/g, '-').toLowerCase()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded.')
    } catch {
      toast.error('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-200/60 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">

      {/* Template badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white/80 backdrop-blur-sm">
          {TEMPLATE_LABELS[cv.templateId] || cv.templateId}
        </span>
      </div>

      {/* ATS badge */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ATSBadge score={atsScore} />
      </div>

      {/* Thumbnail */}
      <Link href={`/builder?cv=${cv.id}`} className="block h-[148px] bg-gray-50 border-b border-gray-100 overflow-hidden relative">
        <div className="absolute inset-0 scale-[0.58] origin-top-left translate-x-[21%]">
          <Thumb />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--dhaka-crimson)]/0 group-hover:bg-[var(--dhaka-crimson)]/5 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--dhaka-crimson)] text-xs font-bold bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
            Edit CV
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Title */}
        {isEditingTitle ? (
          <input
            ref={inputRef}
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSaveTitle(); if (e.key === 'Escape') { setTempTitle(cv.title); setIsEditingTitle(false) } }}
            onBlur={handleSaveTitle}
            className="w-full text-sm font-bold text-gray-900 border-b-2 border-[var(--dhaka-amber)] bg-amber-50/40 px-1 py-0.5 outline-none rounded-sm"
          />
        ) : (
          <h3
            onClick={() => setIsEditingTitle(true)}
            className="text-sm font-bold text-gray-900 truncate cursor-text hover:text-[var(--dhaka-crimson)] transition-colors"
            title="Click to rename"
          >
            {cv.title}
          </h3>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
            {formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true })}
          </span>
          <ATSBadge score={atsScore} className="group-hover:hidden" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-0.5">
            <Link
              href={`/builder?cv=${cv.id}`}
              className="p-2 rounded-lg text-gray-400 hover:text-[var(--dhaka-crimson)] hover:bg-red-50 transition-all"
              title="Edit"
            >
              <PencilLine size={16} />
            </Link>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
              title="Copy share link"
            >
              <Link2 size={16} />
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all disabled:opacity-50"
              title="Download PDF"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            </button>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => onDelete(cv.id)}
        title="Delete this CV?"
        message="This cannot be undone. All progress will be permanently lost."
        confirmLabel="Delete"
        dangerMode={true}
      />
    </div>
  )
}
