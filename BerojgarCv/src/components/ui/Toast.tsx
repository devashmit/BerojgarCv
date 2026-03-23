'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Standard toast messages — never inline strings
export const TOAST_MESSAGES = {
  LINK_COPIED: 'Link copied! Anyone with this link can view your CV.',
  PDF_DOWNLOADED: 'PDF downloaded successfully.',
  CV_SAVED: 'CV saved automatically.',
  CV_DELETED: 'CV deleted.',
  PHOTO_UPLOADED: 'Photo uploaded successfully.',
  SIGN_IN_TO_SAVE: 'Sign in to save your changes permanently.',
  AI_UNAVAILABLE: 'AI unavailable. Please try again.',
  PDF_FAILED: 'PDF generation failed. Please try again.',
  UPLOAD_FAILED: 'Upload failed. Please try an image under 5MB.',
  RATE_LIMIT: 'Rate limit reached. Sign in for unlimited AI improvements.',
} as const

type ToastType = 'success' | 'info' | 'error'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  success: (message: string) => void
  info: (message: string) => void
  error: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastContainer')
  return ctx
}

const ACCENT_COLORS: Record<ToastType, string> = {
  success: 'var(--success)',
  info: 'var(--warning)',
  error: 'var(--error)',
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 64 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 64 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      style={{
        background: 'var(--ground-mid)',
        border: '1px solid var(--ground-rim)',
        borderRadius: 'var(--r-md)',
        boxShadow: 'var(--shadow-card)',
        padding: '14px 18px 14px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '420px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => onRemove(toast.id)}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: ACCENT_COLORS[toast.type],
          borderRadius: '4px 0 0 4px',
        }}
      />

      <span
        style={{
          fontFamily: 'var(--font-jakarta)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-bright)',
          lineHeight: 1.5,
          paddingLeft: '6px',
        }}
      >
        {toast.message}
      </span>

      {/* Progress bar — 3s auto-dismiss */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: ACCENT_COLORS[toast.type],
          transformOrigin: 'left',
          opacity: 0.6,
        }}
      />
    </motion.div>
  )
}

export function ToastContainer({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = crypto.randomUUID()
    setToasts(prev => {
      // Max 3 visible
      const next = [...prev, { id, message, type }]
      if (next.length > 3) next.shift()
      return next
    })
    const timer = setTimeout(() => removeToast(id), 3000)
    timersRef.current.set(id, timer)
  }, [removeToast])

  const api: ToastContextType = {
    success: (msg) => addToast(msg, 'success'),
    info: (msg) => addToast(msg, 'info'),
    error: (msg) => addToast(msg, 'error'),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Toast stack — fixed top-right */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
