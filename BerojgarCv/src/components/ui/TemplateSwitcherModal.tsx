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
import { useState, useEffect } from 'react'

interface TemplateSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_TEMPLATES = [
  { id: 't1', thumb: T1Thumb, name: 'Dhaka Heritage' },
  { id: 't2', thumb: T2Thumb, name: 'Himalaya Modern' },
  { id: 't3', thumb: T3Thumb, name: "Jake's Resume" },
  { id: 't4', thumb: T4Thumb, name: 'Zürich Executive' },
  { id: 't5', thumb: T5Thumb, name: 'Nova Sidebar' },
  { id: 't6', thumb: T6Thumb, name: 'Paris Élégante' },
  { id: 't7', thumb: T7Thumb, name: 'Rirekisho (JIS)' },
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
                          {isSelected && <span className="text-[10px] uppercase font-bold text-[var(--dhaka-crimson)] bg-red-50 px-1.5 py-0.5 rounded">Active</span>}
                        </div>
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
