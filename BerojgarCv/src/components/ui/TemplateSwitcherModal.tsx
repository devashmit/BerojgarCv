'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { DhakaBorder } from '@/components/dhaka'
import { useCVStore } from '@/store/cvStore'
import { T1Thumb } from '../cv-templates/T1Thumb'
import { T2Thumb } from '../cv-templates/T2Thumb'
import { T3Thumb } from '../cv-templates/T3Thumb'
import { T4Thumb } from '../cv-templates/T4Thumb'
import { T5Thumb } from '../cv-templates/T5Thumb'
import { T6Thumb } from '../cv-templates/T6Thumb'
import { T7Thumb } from '../cv-templates/T7Thumb'
import { T8Thumb } from '../cv-templates/T8Thumb'
import { T9Thumb } from '../cv-templates/T9Thumb'
import { T10Thumb } from '../cv-templates/T10Thumb'
import { useState, useEffect } from 'react'

interface TemplateSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_TEMPLATES = [
  { id: 't1', thumb: T1Thumb, name: 'Dhaka Heritage', ats: 72 },
  { id: 't2', thumb: T2Thumb, name: 'Himalaya Modern', ats: 65 },
  { id: 't3', thumb: T3Thumb, name: "Jake's Resume", ats: 98 },
  { id: 't4', thumb: T4Thumb, name: 'Zürich Executive', ats: 92 },
  { id: 't5', thumb: T5Thumb, name: 'Nova Sidebar', ats: 58, warning: 'May face issues with older corporate ATS' },
  { id: 't6', thumb: T6Thumb, name: 'Paris Élégante', ats: 55 },
  { id: 't7', thumb: T7Thumb, name: 'Rirekisho (JIS)', ats: 100 },
  { id: 't8', thumb: T8Thumb, name: 'Classic' },
  { id: 't9', thumb: T9Thumb, name: 'Modern' },
  { id: 't10', thumb: T10Thumb, name: 'Minimal' },
]

export function TemplateSwitcherModal({ isOpen, onClose }: TemplateSwitcherModalProps) {
  const { templateId, setTemplate } = useCVStore()
  const [t7Enabled, setT7Enabled] = useState(true)

  useEffect(() => {
    fetch('/api/flags').then(r => r.json()).then(data => {
      setT7Enabled(data.t7_rirekisho_enabled ?? true)
    }).catch(() => {})
  }, [])

  const templates = ALL_TEMPLATES.filter(t => t.id !== 't7' || t7Enabled)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative"
          >
            <DhakaBorder height={6} className="absolute top-0 left-0 w-full z-10" />

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 mt-1">
              <div>
                <h2 className="text-xl font-bold font-jakarta text-gray-900">Choose Template</h2>
                <p className="text-sm text-gray-500 font-inter mt-0.5">Switch templates anytime. Your content adapts automatically.</p>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Grid Map */}
            <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((tpl) => {
                  const Thumb = tpl.thumb
                  const isSelected = templateId === tpl.id

                  let atsColor = 'bg-red-100 text-red-700 border-red-200'
                  if (tpl.ats !== undefined) {
                    if (tpl.ats >= 85) atsColor = 'bg-green-100 text-green-700 border-green-200'
                    else if (tpl.ats >= 60) atsColor = 'bg-amber-100 text-amber-700 border-amber-200'
                  }
                  
                  return (
                    <div 
                      key={tpl.id}
                      onClick={() => {
                        setTemplate(tpl.id)
                        onClose()
                      }}
                      className={`group cursor-pointer rounded-lg bg-white overflow-hidden transition-all duration-200 border-2 ${isSelected ? 'border-[var(--dhaka-crimson)] shadow-[0_0_15px_rgba(192,57,43,0.3)] ring-1 ring-[var(--dhaka-crimson)]' : 'border-transparent shadow hover:shadow-lg hover:border-gray-200'}`}
                    >
                      <Thumb />
                      <div className="p-3 border-t border-gray-100 bg-white">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium font-inter text-sm ${isSelected ? 'text-[var(--dhaka-crimson)]' : 'text-gray-700'}`}>
                            {tpl.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {tpl.ats !== undefined && (
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wide font-bold border ${atsColor}`}>
                                ATS {tpl.ats}
                              </span>
                            )}
                            {isSelected && <span className="text-[10px] uppercase font-bold text-[var(--dhaka-crimson)] bg-red-50 px-1.5 py-0.5 rounded">Active</span>}
                          </div>
                        </div>
                        {'warning' in tpl && tpl.warning && (
                          <p className="mt-1.5 text-[10px] text-amber-600 font-inter leading-tight">
                            ⚠ {tpl.warning}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
