'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

interface ReportDialogProps {
  shareId: string
  isOpen: boolean
  onClose: () => void
}

const REASONS = [
  'Inappropriate content',
  'Spam or misleading',
  'Personal information exposure',
  'Copyright infringement',
  'Other'
]

export function ReportDialog({ shareId, isOpen, onClose }: ReportDialogProps) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async () => {
    if (!reason) return
    setLoading(true)
    try {
      const res = await fetch(`/api/cv/share/${shareId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      })
      if (!res.ok) throw new Error()
      toast.success('Report submitted. Thank you for keeping our community safe.')
      onClose()
    } catch {
      toast.error('Failed to submit report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl p-6 w-full max-w-sm relative z-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle size={20} />
                <h3 className="font-bold font-fraunces text-lg">Report this CV</h3>
              </div>
              <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Please select the reason for reporting this content. Our moderators will review it shortly.
            </p>

            <div className="space-y-3 mb-8">
              {REASONS.map(r => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    reason === r 
                      ? 'bg-red-50 border-red-200 text-red-700 font-bold shadow-sm' 
                      : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!reason || loading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Submit Report'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
