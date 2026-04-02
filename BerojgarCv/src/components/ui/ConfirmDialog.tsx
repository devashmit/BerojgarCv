'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  dangerMode?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  dangerMode = false,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div 
                    className={`p-3 rounded-full shrink-0 ${
                      dangerMode ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    <AlertTriangle size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-gray-900 font-fraunces leading-tight">
                        {title}
                      </h3>
                      <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all text-center"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onConfirm()
                          onClose()
                        }}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-md text-center ${
                          dangerMode 
                            ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                            : 'bg-[var(--dhaka-crimson)] hover:bg-[var(--dhaka-crimson-hover)] shadow-red-100'
                        }`}
                      >
                        {confirmLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
