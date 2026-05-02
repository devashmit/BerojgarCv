'use client'

import React, { useState, useEffect, useRef } from 'react'
import { THUMB_MAP } from '../cv-templates'
import { ATSBadge } from '../ui/ATSBadge'
import { PencilLine, Link2, Download, Trash2, Loader2, MoreHorizontal } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useToast } from '../ui/Toast'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { calculateATS } from '@/lib/atsCalculator'

const TEMPLATE_LABELS: Record<string, string> = {
  t1: 'Dhaka Heritage', t2: 'Himalaya Modern', t3: "Jake's Resume",
  t4: 'Zürich Executive', t5: 'Nova Sidebar', t6: 'Paris Élégante', t7: 'Rirekisho',
}

const TEMPLATE_COLORS: Record<string, string> = {
  t1: '#1A2744', t2: '#2B6CB0', t3: '#000000',
  t4: '#374151', t5: '#2D6A4F', t6: '#C9B99A', t7: '#1a1a1a',
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
  const [showMenu, setShowMenu] = useState(false)
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const Thumb = THUMB_MAP[cv.templateId] || THUMB_MAP.t3
  const atsScore = calculateATS(cv.data, cv.templateId)
  const accentColor = TEMPLATE_COLORS[cv.templateId] || '#C0392B'

  useEffect(() => {
    if (isEditingTitle) inputRef.current?.focus()
  }, [isEditingTitle])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
    setShowMenu(false)
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    setShowMenu(false)
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
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">

      {/* Thumbnail area */}
      <Link href={`/builder?cv=${cv.id}`} className="block relative bg-[#F3F4F6] overflow-hidden" style={{ height: 160 }}>
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: accentColor }} />

        {/* Scaled thumb — render at natural size then scale up to fill */}
        <div className="absolute inset-0 flex items-start justify-center pt-4 overflow-hidden">
          <div style={{ transform: 'scale(1.1)', transformOrigin: 'top center' }}>
            <Thumb />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
            Open Editor
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          {isEditingTitle ? (
            <input
              ref={inputRef}
              value={tempTitle}
              onChange={e => setTempTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSaveTitle()
                if (e.key === 'Escape') { setTempTitle(cv.title); setIsEditingTitle(false) }
              }}
              onBlur={handleSaveTitle}
              className="flex-1 text-sm font-bold text-gray-900 border-b-2 border-[#C0392B] bg-transparent outline-none py-0.5"
            />
          ) : (
            <h3
              onClick={() => setIsEditingTitle(true)}
              className="flex-1 text-sm font-bold text-gray-900 truncate cursor-text hover:text-[#C0392B] transition-colors"
              title="Click to rename"
            >
              {cv.title}
            </h3>
          )}

          {/* Kebab menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(v => !v)}
              className="p-1 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <MoreHorizontal size={16} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-7 w-44 bg-white rounded-xl border border-gray-100 shadow-lg z-20 py-1 overflow-hidden">
                <Link
                  href={`/builder?cv=${cv.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <PencilLine size={14} className="text-gray-400" /> Edit
                </Link>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Link2 size={14} className="text-gray-400" /> Copy share link
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isDownloading
                    ? <Loader2 size={14} className="animate-spin text-gray-400" />
                    : <Download size={14} className="text-gray-400" />
                  }
                  {isDownloading ? 'Downloading...' : 'Download PDF'}
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button
                  onClick={() => { setShowConfirm(true); setShowMenu(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium">
            {formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true })}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${accentColor}15`, color: accentColor }}
            >
              {TEMPLATE_LABELS[cv.templateId] || cv.templateId}
            </span>
            <ATSBadge score={atsScore} />
          </div>
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
